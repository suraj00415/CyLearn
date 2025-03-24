import axios from "axios";
import { useRef, useState } from "react";
import { baseURL } from "./utils/consts";

function App() {
  const [connection, setConnection] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateInstance = async () => {
    setLoading(true);
    try {
      const url = baseURL + "vm/create-instance";
      const response = await axios.post(url);
      setConnection(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create instance");
    }
    setLoading(false);
  };
  const iframeRef = useRef(null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Ubuntu in Browser</h1>
      {!connection && connection === null && <button
        onClick={handleCreateInstance}
        disabled={loading || connection !== null}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 ease-in-out shadow-lg"
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            Launching...
          </span>
        ) : (
          "Start Ubuntu"
        )}
      </button>
      }

      {connection && (
        <div className=" w-full max-w-4xl" onClick={() => { iframeRef?.current.focus() }}>
          <h2 className="text-xl font-semibold mb-4 text-center" >
            Guacamole Remote Desktop
          </h2>
          <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg ">
            <iframe
              title="Ubuntu-GNOME Session"
              src={connection?.guacUrl + "?embed=true&enable-keyboard=true"}
              className="w-full h-[500px] border-none"
              tabIndex={0} // Added this attribute
              onLoad={(e) => e.target?.contentWindow?.focus()}
              ref={iframeRef}
            />
          </div>
          <button
            onClick={() => iframeRef.current.requestFullscreen()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mt-4 justify-center items-center"
          >
            Full Screen
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
