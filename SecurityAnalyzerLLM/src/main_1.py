from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vector_data import vectorstore
from langchain_core.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough, RunnableParallel
from langchain_core.output_parsers import StrOutputParser, PydanticOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from pydantic import Field, BaseModel
from typing import List, Optional, Literal
import os

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
parser = StrOutputParser()


class Vulnerability(BaseModel):
    type: str = Field(
        description=(
            "Specifies the category of the vulnerability, such as CWE (Common Weakness Enumeration) "
            "or CVE (Common Vulnerabilities and Exposures). This field identifies the classification system "
            "used to catalog the security weakness."
        )
    )
    id: str = Field(
        description="The unique identifier of the vulnerability (e.g., 'CWE-89'), which is used to reference the specific security flaw."
    )
    name: str = Field(
        description="A concise title for the vulnerability that summarizes its nature, such as 'SQL Injection'."
    )
    description: str = Field(
        description=(
            "A comprehensive explanation of the vulnerability. This includes how the vulnerability manifests, "
            "its underlying causes, potential impacts on the system, and any technical details necessary for understanding the risk."
        )
    )
    severity: Literal["Critical", "High", "Medium", "Low"] = Field(
        description=(
            "The assessed severity level of the vulnerability, indicating the potential risk if exploited. "
            "Severity levels follow a standard classification: 'Critical', 'High', 'Medium', or 'Low'."
        )
    )


class Vulnerablilities(BaseModel):
    explaination: str = Field(
        description=(
            "A detailed narrative that describes the overall vulnerabilities identified in the code. "
            "This includes context, risk assessment, and the potential impact of the detected issues."
        )
    )
    explaination_of_security_level_dvwa: str = Field(
        description=(
            "An in-depth explanation of the security level as defined by DVWA (Damn Vulnerable Web Application) "
            "standards. This should elaborate on why the code is classified at a particular security level based on DVWA metrics."
        )
    )
    security_level: Literal["Impossible", "High", "Medium", "Low"] = Field(
        description=(
            "The overall security rating assigned to the code with respect to DVWA security standards. "
            "It reflects the severity of the vulnerabilities present, using a standard scale: 'Critical', 'High', 'Medium', or 'Low'."
            "For low severity it should be ideal for beginners to learn the impact of vulnerabilities easily and easily exploitable plus easily available for the public to see the code,For medium Simulates lazy or incomplete security implementations,For High Vulnerabilities are harder to exploit and may require advanced techniques to exploit and it is not known publicly to all the levels of hackers,For Impossiple acts as a benchmark to compare against insecure configurations,Uses secure coding principles across all features"
        )
    )
    cwe_list: List[Vulnerability] = Field(
        description=(
            "A list of individual vulnerabilities detected in the code. Each entry is represented by a CWE record "
            "that includes the vulnerability's identifier, title, description, and severity."
        )
    )


class Secure_Coding(BaseModel):
    secure_code_output: str = Field(
        description=(
            "The updated version of the code that has been modified to mitigate the identified vulnerabilities. "
            "This secure code should reflect best practices and address the security issues found in the original code with the very least CWE to be attacked."
        )
    )
    mitigation: str = Field(
        description=(
            "A detailed account of the mitigation strategies employed to address the vulnerabilities. "
            "This should include specific measures, such as parameterized queries, input validation, and other security best practices."
        )
    )
    explaination_of_changes: str = Field(
        description=(
            "An explanation outlining the changes made to the code. This should detail how each modification contributes "
            "to improving the security of the application, including the rationale behind the updates."
        )
    )


parserpydantic_cwe = PydanticOutputParser(pydantic_object=Vulnerablilities)
parserpydantic_secure_code = PydanticOutputParser(pydantic_object=Secure_Coding)

vul_prompt = PromptTemplate(
    template="""You are a cybersecurity expert specializing in code security analysis. Your task is to analyze the given code and identify security vulnerabilities present in it.  
            #### **Instructions:**  
            - **Examine the provided code snippet carefully.**  
            - **Identify and classify the vulnerabilities** based on security weaknesses.  
            - **Assign CWE (Common Weakness Enumeration) IDs** to each detected vulnerability.  
            - **Provide a severity level** (Critical, High, Medium, or Low) based on its potential impact of the dvwa specified security level.  
            - **Explain the root cause** of the vulnerability in detail.  
            - **Provide observed examples** where this vulnerability has led to security breaches.  
            - **Suggest potential mitigations** to secure the code.  
            - **Highlight which resources in the code are affected.**  
            - **If applicable, provide background details on how attackers can exploit the vulnerability.**  
            #### **Code to Analyze:**  
            {code}""",
    input_variables=["code"],
    validate_template=True,
)

vul_chain = vul_prompt | model | parser

template_rag = PromptTemplate(
    template="""You are a seasoned cybersecurity analyst with extensive experience in vulnerability analysis and CWE classifications. Your expertise is sought to provide a thorough analysis based on the given context. 
                Below, you are provided with specific context information and a related question. Your task is to carefully review the context and answer the question by incorporating the following elements:
                - **CWE Identification:** Clearly specify the Common Weakness Enumeration (CWE) identifier that best corresponds to the vulnerability described.
                - **Severity Classification:** Classify the severity of the vulnerability as Impossible, High, Medium, or Low, based on factors such as impact, exploitability, and the dvwa specified security level.
                - **Detailed Explanation:** Provide a well-structured explanation outlining your reasoning, including the key factors and evidence from the context that support your conclusions.
                - **Mitigation Recommendations:** If applicable, suggest potential mitigation strategies or best practices to address the vulnerability.
                Use only the context provided below to ensure your response is fully supported by the available information.
                Context:
                {context}
                Question:
                {question}
                Answer (include CWE ID, severity, detailed explanation, and any recommended mitigations):
                \n {format_instruction}""",
    input_variables=["context", "question"],
    partial_variables={
        "format_instruction": parserpydantic_cwe.get_format_instructions()
    },
    validate_template=True,
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 3})


def retrieve_context(input_dict):
    vulnerability = input_dict.get("vulnerability", "")
    question = input_dict.get("question", "")
    retrieved_docs = retriever.invoke(f"Vulnerability: {vulnerability}")
    formatted_output = "\nRetriever Results:\n" + "\n".join(
        [
            f"- CWE ID: {doc.metadata.get('cwe_id', 'N/A')}\n"
            f"- observed_examples: {doc.metadata.get('observed_examples', 'N/A')}\n"
            f"- potential_mitigations: {doc.metadata.get('potential_mitigations', 'N/A')}\n"
            f"- affected_resources: {doc.metadata.get('affected_resources', 'N/A')}\n"
            f"- notes: {doc.metadata.get('notes', 'N/A')}\n"
            f"- background_details: {doc.metadata.get('background_details', 'N/A')}\n"
            f"  Name: {doc.metadata.get('name', 'Unknown')}\n"
            f"  Description: {doc.page_content}\n"
            for doc in retrieved_docs
        ]
    )
    return formatted_output


rag_chain = (
    RunnableParallel(
        {
            "context": retrieve_context,
            "question": RunnablePassthrough(),
        }
    )
    | template_rag
    | model
    | parserpydantic_cwe
)


def output_context_for_secure_coding(input_dict):
    cwe_output = input_dict.get("cwe", "")
    sample_code = input_dict.get("vulnerable_code", "")
    return str(cwe_output) + "Vulnerable Code:\n" + sample_code


template_secure_code = PromptTemplate(
    template="""You are an experienced cybersecurity expert and software developer with a strong focus on secure coding practices. Based on the vulnerability analysis and the vulnerable code provided below, along with any associated CWE identifier, your task is to generate a secure version of the code. 
                ----------------------------------------
                Vulnerability Analysis & Vulnerable Code:
                {vulnerable_code}
                ----------------------------------------
                CWE Identifier (if provided):
                {cwe}
                Instructions:
                1. Modify the provided code to mitigate the identified vulnerabilities.
                2. Ensure that the secure code adheres to best practices in secure coding.
                3. Include clear comments in the code explaining the changes made and how these changes enhance the security of the application.
                4. Provide the final secure version of the code as your cwe_output.
                Secure Code Output:
                \n {formatted_instruction}""",
    input_variables=["vulnerable_code", "cwe"],
    partial_variables={
        "formatted_instruction": parserpydantic_secure_code.get_format_instructions()
    },
    validate_template=True,
)

secure_rag = (
    RunnableParallel(
        {
            "vulnerable_code": output_context_for_secure_coding,
            "cwe": RunnablePassthrough(),
        }
    )
    | template_secure_code
    | model
    | parserpydantic_secure_code
)

app = FastAPI()


class CodeRequest(BaseModel):
    sample_code: str


class AnalysisResponse(BaseModel):
    cwe_output: dict
    secure_code_output: dict


@app.post("/analyze", response_model=AnalysisResponse)
def analyze_code(request: CodeRequest):
    try:
        sample_code = request.sample_code

        vulnerability = vul_chain.invoke({"code": sample_code})

        cwe_output = rag_chain.invoke(
            {
                "question": (
                    "Based on the detected vulnerability details provided and the sample code below, "
                    "please identify the corresponding CWE identifier for the vulnerability. "
                    "Additionally, classify the severity level of the vulnerability (Critical, High, Medium, or Low) "
                    "and explain your reasoning by considering factors such as potential impact, ease of exploitation, "
                    "and available mitigation strategies.\n\n"
                ),
                "vulnerability": vulnerability + "Sample Code:\n" + sample_code,
            }
        )

        secure_rag_output = secure_rag.invoke(
            {"vulnerable_code": sample_code, "cwe": cwe_output}
        )
        print(secure_rag_output)
        return {
            "cwe_output": cwe_output.model_dump(),
            "secure_code_output": secure_rag_output.model_dump(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


HOST = os.getenv("HOST", "0.0.0.0")  # Default to 0.0.0.0 if not specified
PORT = int(os.getenv("PORT", 7001))  # Default to 7001 if not specified


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=HOST, port=PORT)


{
    "cwe_output": {
        "explaination": str,
        "explaination_of_security_level_dvwa": str,
        "security_level": str,
        "cwe_list": [
            {
                "type": str,
                "id": str,
                "name": str,
                "description": str,
                "severity": "Critical",
            }
        ],
    },
    "secure_code_output": {"secure_code_output": str},
}
