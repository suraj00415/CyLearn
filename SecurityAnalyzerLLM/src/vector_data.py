import os
import pandas as pd
import requests
import zipfile
import io
from datetime import datetime
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document
from langchain_chroma import Chroma


load_dotenv()

CWE_ZIP_URL = "https://cwe.mitre.org/data/csv/699.csv.zip"
CWE_CSV_PATH = "data/cwe_data.csv"
VECTOR_DB_PATH = "chroma_db"
CWE_VERSION = 4.16
LAST_CHECK_FILE = "last_checked.txt"


def get_stored_version():
    if os.path.exists(LAST_CHECK_FILE):
        with open(LAST_CHECK_FILE, "r") as f:
            lines = f.read().strip().split("\n")
            if len(lines) == 2:
                last_date, version = lines
                return last_date, float(version)
    return None, CWE_VERSION


def save_version(version):
    with open(LAST_CHECK_FILE, "w") as f:
        f.write(f"{datetime.today().date()}\n{version}")


def get_latest_version():
    last_date, stored_version = get_stored_version()
    today = str(datetime.today().date())

    if last_date == today:
        return stored_version

    response = requests.get("https://cwe-api.mitre.org/api/v1/cwe/version")
    if response.status_code == 200:
        data = response.json()
        new_version = float(data["ContentVersion"])
        save_version(new_version)
        return new_version

    return stored_version


def download_cwe_data():
    response = requests.get(CWE_ZIP_URL)
    if response.status_code == 200:
        zip_file = zipfile.ZipFile(io.BytesIO(response.content))
        csv_filename = zip_file.namelist()[0]
        with zip_file.open(csv_filename) as csv_file:
            cwe_df = pd.read_csv(csv_file, index_col=False)
        cwe_df.to_csv(CWE_CSV_PATH, index=False)
        return cwe_df
    else:
        print("Failed to download the ZIP file")
        return None


embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")


def load_vectorDB():
    new_cwe_version = get_latest_version()

    if CWE_VERSION < new_cwe_version or not os.path.exists(VECTOR_DB_PATH):
        if not os.path.exists("data"):
            os.makedirs("data")
        if not os.path.exists(VECTOR_DB_PATH):
            os.makedirs(VECTOR_DB_PATH)
        download_cwe_data()
        new_cwe_df = pd.read_csv(CWE_CSV_PATH, index_col=False)
        cwe_docs = [
            Document(
                page_content=row["Description"],
                metadata={
                    "cwe_id": row["CWE-ID"],
                    "name": row["Name"],
                    "observed_examples": row["Observed Examples"],
                    "potential_mitigations": row["Potential Mitigations"],
                    "affected_resources": row["Affected Resources"],
                    "notes": row["Notes"],
                    "background_details": row["Background Details"],
                },
            )
            for _, row in new_cwe_df.iterrows()
        ]

        vectorstore = Chroma.from_documents(
            cwe_docs, embedding=embeddings, persist_directory=VECTOR_DB_PATH
        )
        return vectorstore

    vectorstore = Chroma(
        persist_directory=VECTOR_DB_PATH, embedding_function=embeddings
    )
    return vectorstore


vectorstore = load_vectorDB()
