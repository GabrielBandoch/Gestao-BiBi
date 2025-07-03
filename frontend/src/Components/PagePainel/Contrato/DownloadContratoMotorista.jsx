import { useState } from "react";
import ContratoPreview from "./contratoPreview";
import { FaDownload } from "react-icons/fa6";
import axios from "axios";

export default function DownloadContratoMotorista({ contrato }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const token = localStorage.getItem("token");

    try {
      setIsDownloading(true);

      const res = await axios.get(`http://localhost:1337/contrato/download/${contrato._id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `contrato-${contrato._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao fazer download do contrato:", error);
      alert("Erro ao baixar o contrato.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="w-full h-full flex justify-between">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="py-2 px-5 space-x-3 flex justify-center items-center rounded-lg text-white bg-[rgba(3,105,161,0.9)] hover:bg-[rgba(3,105,161,1)] transition-all duration-300 ease-in-out transform"
            >
              <FaDownload className="text-lg" />
              <p>{isDownloading ? "Baixando..." : "Baixar PDF"}</p>
            </button>
          </div>

          <ContratoPreview contrato={contrato.contrato} />
        </div>
      </div>

      <div className="w-60 bg-white" />
    </section>
  );
}
