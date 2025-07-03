import { useEffect, useState } from "react";
import axios from "axios";
import ContratoPreview from "./contratoPreview";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

// Supondo que o ID do usuário logado esteja disponível via props ou contexto
export default function ContratoResponsavel({ responsavelId }) {
  const [contratos, setContratos] = useState([]);
  const [contrato, setContrato] = useState(null);
  const [assinaturaNome, setAssinaturaNome] = useState("");

  useEffect(() => {
    async function fetchContratos() {
      try {
        const token = localStorage.getItem('token'); // ou sessionStorage

        const res = await axios.get("http://localhost:1337/contrato/listar", {
          params: {
            responsavelId,
            status: "enviado_para_responsavel",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contratosRecebidos = res.data;
        setContratos(contratosRecebidos);
        if (contratosRecebidos.length > 0) {
          setContrato(contratosRecebidos[0]);
          setAssinaturaNome(contratosRecebidos[0].nomeMotorista || "");
        }
      } catch (err) {
        console.error("Erro ao buscar contratos:", err);
      }
    }

    fetchContratos();
  }, [responsavelId]);


  const assinarContrato = async () => {
    if (!assinaturaNome || !contrato?._id) {
      alert("Preencha o nome antes de assinar.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // ou sessionStorage se preferir

      await axios.post(
        `http://localhost:1337/relatorio/assinarResponsavel`,
        {
          contratoId: contrato._id,
          contratoAtualizado: {
            ...contrato.contrato,
            assinaturaResponsavel: assinaturaNome,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Contrato assinado com sucesso!");

      // Remove da tela
      setContrato(null);
      setContratos((prev) => prev.filter((c) => c._id !== contrato._id));
    } catch (err) {
      console.error(err);
      alert("Erro ao assinar contrato.");
    }
  };

  const negarContrato = () => {
    setContrato(null);
  };

  if (!contrato) {
    return (
      <div className="select-none flex flex-col justify-center items-center w-full h-full">
        <p className="text-2xl text-[rgb(70,189,253)]">Não há contratos para serem assinados</p>
        <p className="text-sm text-[rgba(70,189,253,0.5)]">Em caso de problemas, entrar em contato com o condutor</p>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex justify-between">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={negarContrato}
              className="py-2 px-5 space-x-3 flex justify-center items-center rounded-lg text-[rgba(133,133,133,1)] bg-[rgba(152,162,179,0.2)] cursor-pointer hover:bg-[rgba(152,162,179,0.3)] group transition-all duration-300 ease-in-out transform"
            >
              <IoCloseSharp className="text-lg transition-all duration-300 ease-in-out transform" />
              <p className="transition-all duration-300 ease-in-out transform">Negar Contrato</p>
            </button>

            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded"
              value={assinaturaNome}
              onChange={(e) => setAssinaturaNome(e.target.value)}
              placeholder="Digite seu nome para assinar"
            />

            <button
              onClick={assinarContrato}
              className="py-2 px-5 space-x-3 flex justify-center items-center rounded-lg text-white bg-[rgba(3,105,161,0.9)] cursor-pointer hover:bg-[rgba(3,105,161,1)] group transition-all duration-300 ease-in-out transform"
            >
              <FaCheck className="text-lg transition-all duration-300 ease-in-out transform" />
              <p className="transition-all duration-300 ease-in-out transform">Assinar Contrato</p>
            </button>
          </div>

          <ContratoPreview contrato={contrato.contrato} />
        </div>
      </div>

      <div className="w-60 bg-white" />
    </section>
  );
}
