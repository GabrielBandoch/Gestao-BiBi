import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import ContratoPreview from "./contratoPreview";
import axios from "axios";

export default function AssinarContratoMotorista({ contrato, onAssinar, onCancelar }) {
  const [nomeMotorista, setNomeCondutor] = useState(contrato?.nomeMotorista || "");

  const assinarContrato = async () => {
    if (!nomeMotorista) {
      alert("Digite seu nome para assinar o contrato.");
      return;
    }
  const token = localStorage.getItem("token");
  console.log("Token recuperado:", token);
    try {
      await axios.post("http://localhost:1337/contrato/assinar-final", {
        contratoId: contrato._id,
        nomeMotorista,
      }, {
              headers: {
        Authorization: `Bearer ${token}`
      }
      });

      alert("Contrato assinado com sucesso!");
      onAssinar(contrato._id);
    } catch (err) {
      console.error("Erro ao assinar contrato:", err);
      alert("Erro ao assinar contrato.");
    }
  };

  return (
    <section className="w-full h-full flex justify-between">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={onCancelar}
              className="py-2 px-5 space-x-3 flex justify-center items-center rounded-lg text-[rgba(133,133,133,1)] bg-[rgba(152,162,179,0.2)] cursor-pointer hover:bg-[rgba(152,162,179,0.3)] group transition-all duration-300 ease-in-out transform"
            >
              <IoCloseSharp className="text-lg" />
              <p>Cancelar</p>
            </button>

            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded"
              value={nomeMotorista}
              onChange={(e) => setNomeCondutor(e.target.value)}
              placeholder="Digite seu nome para assinar"
            />

            <button
              onClick={assinarContrato}
              className="py-2 px-5 space-x-3 flex justify-center items-center rounded-lg text-white bg-[rgba(3,105,161,0.9)] cursor-pointer hover:bg-[rgba(3,105,161,1)] group transition-all duration-300 ease-in-out transform"
            >
              <FaCheck className="text-lg" />
              <p>Assinar Contrato</p>
            </button>
          </div>

          <ContratoPreview contrato={contrato.contrato} />
        </div>
      </div>

      <div className="w-60 bg-white" />
    </section>
  );
}
