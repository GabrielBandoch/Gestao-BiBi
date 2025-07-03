import { useState, useEffect } from "react";
import axios from "axios";

/* Components */
import ContratoPreview from "./contratoPreview";
import InfoContrato from "./infoContrato";
import AssinarContratoMotorista from "./AssinarContratoMotorista";

/* Services */
import { getResponsaveis } from "../../../services/responsavelServices";

export default function ContratoCondutor() {
  const [contrato, setContrato] = useState(null);
  const [mongoId, setMongoId] = useState(null);
  const [completos, setCompletos] = useState([]);

  const [responsaveis, setResponsaveis] = useState([]);
  const [responsavelSelecionado, setResponsavelSelecionado] = useState("");
  const [contratosResponsavel, setContratosResponsavel] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [contratoPendenteSelecionado, setContratoPendenteSelecionado] = useState(null);

  const [assinados, setAssinados] = useState([]);
  const [contratoAssinadoSelecionado, setContratoAssinadoSelecionado] = useState(null);

  useEffect(() => {
    getResponsaveis()
      .then(setResponsaveis)
      .catch((err) => console.error("Erro ao buscar responsáveis:", err));

    const token = localStorage.getItem("token");

    axios.get("http://localhost:1337/contrato/listar", {
      params: {
        motoristaId: localStorage.getItem("userId"),
        status: "aguardando_assinatura_do_motorista",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setPendentes(res.data))
      .catch((err) => console.error("Erro ao buscar contratos pendentes:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios.get("http://localhost:1337/contrato/listar", {
      params: {
        motoristaId: userId,
        status: "assinado_pelo_motorista",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setAssinados(res.data))
      .catch((err) => console.error("Erro ao buscar contratos assinados:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const motoristaId = localStorage.getItem("userId");

    axios.get("http://localhost:1337/contrato/listar", {
      params: {
        motoristaId,
        status: "completo"
      },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setCompletos(res.data))
      .catch(err => console.error("Erro ao buscar contratos completos:", err));
  }, []);

  const buscarContratosResponsavel = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:1337/contrato/listar", {
        params: { responsavelId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContratosResponsavel(response.data);
    } catch (err) {
      console.error("Erro ao buscar contratos:", err);
    }
  };

  const handleSelecionarResponsavel = (e) => {
    const id = e.target.value;
    setResponsavelSelecionado(id);

    const responsavel = responsaveis.find((r) => r.id == id);
    if (!responsavel) return;

    buscarContratosResponsavel(id);

    const novoContrato = {
      nomeCondutor: "",
      contratado: [
        {
          nome: responsavel.nome,
          endereco: responsavel.endereco || "",
          numeroCasa: responsavel.numeroCasa || "",
          bairro: responsavel.bairro || "",
          cep: responsavel.cep || "",
          cpf: responsavel.cpf || "",
          rg: responsavel.rg || "",
          telefone: responsavel.celular || "",
        },
      ],
      assinado: false,
      tipoTrajeto: 1,
      formaPagamento: "",
      valorTotal: "",
      numeroParcelas: "",
      valorParcela: "",
      dataPagamento: "",
      data: [
        {
          dia: null,
          mes: "",
          ano: null,
        },
      ],
      Alunos: [],
    };

    setContrato(novoContrato);
  };

  const enviarContratoEmail = async () => {
    if (!contrato || !responsavelSelecionado) {
      alert("Preencha o contrato e selecione um responsável.");
      return;
    }

    const idMotorista = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token de autenticação não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/relatorio/enviar-email",
        { contrato, idResponsavel: responsavelSelecionado, idMotorista },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMongoId(response.data.mongoPdfId);
      alert("Contrato enviado por e-mail com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar contrato por e-mail.");
    }
  };

  const baixarPdf = () => {
    if (!mongoId) return;
    window.open(`http://localhost:1337/relatorio/baixar/${mongoId}`, "_blank");
  };

  const renderContratosListados = () =>
    contratosResponsavel.length > 0 && (
      <div className="my-6 w-full max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-3 text-gray-800">
          Contratos existentes deste responsável:
        </h3>
        <ul className="space-y-3">
          {contratosResponsavel.map((c) => (
            <li key={c._id} className="border rounded p-4 shadow-sm bg-white">
              <p>
                <strong>Status:</strong> {c.status || "Sem status"}
              </p>
              <p>
                <strong>Criado em:</strong>{" "}
                {new Date(c.dataCriacao).toLocaleDateString()}
              </p>
              {c.valorTotal && (
                <p>
                  <strong>Valor Total:</strong> R$ {c.valorTotal}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <section className="w-full h-full flex justify-between">
      <div className="w-full flex flex-col justify-start items-center">
        <div className="mt-8 mb-6 w-80">
          <label htmlFor="responsavelSelect1" className="text-sm mb-2 block">
            Selecionar Responsável:
          </label>
          <select
            id="responsavelSelect1"
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={responsavelSelecionado || ""}
            onChange={handleSelecionarResponsavel}
          >
            <option value="">-- Selecione um responsável --</option>
            {responsaveis.map((resp) => (
              <option key={resp.id} value={resp.id}>
                {resp.nome}
              </option>
            ))}
          </select>
        </div>

        {pendentes.length > 0 && (
          <div className="mb-6 w-80">
            <label htmlFor="pendenteSelect" className="text-sm mb-2 block">
              Contratos pendentes para sua assinatura:
            </label>
            <select
              id="pendenteSelect"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={contratoPendenteSelecionado?._id || ""}
              onChange={(e) => {
                const contrato = pendentes.find((p) => p._id === e.target.value);
                setContratoPendenteSelecionado(contrato);
              }}
            >
              <option value="">-- Selecione um contrato pendente --</option>
              {pendentes.map((c) => (
                <option key={c._id} value={c._id}>
                  {new Date(c.dataCriacao).toLocaleDateString()} - {c.contrato?.contratado?.[0]?.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {assinados.length > 0 && (
          <div className="mb-6 w-80">
            <label htmlFor="assinadosSelect" className="text-sm mb-2 block">
              Contratos já assinados:
            </label>
            <select
              id="assinadosSelect"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={contratoAssinadoSelecionado?._id || ""}
              onChange={(e) => {
                const c = assinados.find((c) => c._id === e.target.value);
                setContratoAssinadoSelecionado(c);
              }}
            >
              <option value="">-- Selecione um contrato assinado --</option>
              {assinados.map((c) => (
                <option key={c._id} value={c._id}>
                  {new Date(c.dataCriacao).toLocaleDateString()} - {c.contrato?.contratado?.[0]?.nome || "Sem nome"}
                </option>
              ))}
            </select>
          </div>
        )}

        {contratoAssinadoSelecionado && contratoAssinadoSelecionado.pdfId && (
          <div className="mb-8 w-80 text-center">
            <button
              onClick={() =>
                window.open(
                  `http://localhost:1337/relatorio/baixar/${contratoAssinadoSelecionado.pdfId}`,
                  "_blank"
                )
              }
              className="bg-gray-700 text-white px-4 py-2 rounded mt-3"
            >
              Baixar Contrato em PDF
            </button>
          </div>
        )}

        {contratoPendenteSelecionado && (
          <AssinarContratoMotorista
            contrato={contratoPendenteSelecionado}
            onAssinar={(idAssinado) => {
              setPendentes((prev) => prev.filter((c) => c._id !== idAssinado));
              setContratoPendenteSelecionado(null);
            }}
            onCancelar={() => setContratoPendenteSelecionado(null)}
          />
        )}

        {!contrato && !contratoPendenteSelecionado && (
          <div className="text-center mt-8">
            <p className="text-2xl text-[rgb(70,189,253)]">Nenhum contrato carregado</p>
            <p className="text-sm text-[rgba(70,189,253,0.5)]">
              Selecione um responsável ou contrato pendente
            </p>
          </div>
        )}

        {contrato && !contratoPendenteSelecionado && (
          <div className="flex justify-center items-start space-x-6 w-full h-full">
            <div className="w-full max-w-100 h-full max-h-140 flex flex-col justify-start bg-white border border-gray-300 rounded-xl">
              <InfoContrato contrato={contrato} setContrato={setContrato} />
              <div className="px-4 pb-4">
                <label htmlFor="responsavelSelect2" className="block text-sm mb-2">
                  Selecionar outro Responsável:
                </label>
                <select
                  id="responsavelSelect2"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={responsavelSelecionado || ""}
                  onChange={handleSelecionarResponsavel}
                >
                  <option value="">-- Selecione um responsável --</option>
                  {responsaveis.map((resp) => (
                    <option key={resp.id} value={resp.id}>
                      {resp.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-4 space-x-4">
                <button
                  onClick={enviarContratoEmail}
                  disabled={
                    contrato?.status === "enviado_para_responsavel" ||
                    contrato?.status === "assinado_pelo_responsavel"
                  }
                  className={`bg-green-600 text-white px-4 py-2 rounded ${contrato?.status === "enviado_para_responsavel" || contrato?.status === "assinado_pelo_responsavel" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Enviar Contrato por E-mail
                </button>
                {mongoId && (
                  <button
                    onClick={baixarPdf}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                  >
                    Baixar PDF
                  </button>
                )}
              </div>
            </div>
            <div className="flex w-full h-full max-w-182">
              <ContratoPreview contrato={contrato} />
            </div>
          </div>

        )}
        <div className="my-6 w-full max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Contratos finalizados
          </h3>
          <ul className="space-y-3">
            {completos.map((c) => (
              <li key={c._id} className="border rounded p-4 shadow-sm bg-white flex justify-between items-center">
                <div>
                  <p><strong>Data:</strong> {new Date(c.dataCriacao).toLocaleDateString()}</p>
                  <p><strong>Responsável:</strong> {c.contrato?.contratado?.[0]?.nome}</p>
                </div>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-2"
                  onClick={() => window.open(`http://localhost:1337/relatorio/baixar/${c.pdfId}`, "_blank")}
                >
                  <span>Baixar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
