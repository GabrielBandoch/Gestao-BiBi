// /* Dependencias */
// import { useState } from "react";
// import axios from "axios";

// /* Imports */
// import ContratoPreview from "./contratoPreview";
// import InfoContrato from "./infoContrato";

// /* Funções arquivo */
// export default function ContratoCondutor() {
//     const [contrato, setContrato] = useState({
//         nomeCondutor: "Eric Gabriel Caetano",
//         contratado: [
//             {
//                 nome: "Daniela Luisa",
//                 endereco: "Alfredo Stringari",
//                 numeroCasa: "620",
//                 bairro: "Ulysses Guimarães",
//                 cep: "89.230-690",
//                 cpf: "122.814.149-57",
//                 rg: "12.345.678-9",
//                 telefone: "(47) 99264-7501",
//             }
//         ],
//         assinado: false,
//         tipoTrajeto: 1,
//         formaPagamento: "Cartão",
//         valorTotal: "12.000,00",
//         numeroParcelas: "3",
//         valorParcela: "4.000,00",
//         dataPagamento: "19/06/2025",
//         data: [
//             {
//                 dia: 19,
//                 mes: "Janeiro",
//                 ano: 2025,
//             }
//         ],
//         Alunos: [
//             {
//                 nome: "João Pedro",
//                 nascimento: "12/04/2012",
//                 serie: "Sexta",
//                 nomeEscola: "Amador Aguiar",
//             },
//         ],
//     });

//     const [mongoId, setMongoId] = useState(null);

//     const enviarContratoEmail = async () => {
//         try {
//             const conteudo = `
// ALUNO: ${contrato.Alunos[0].nome}
// DATA NASC: ${contrato.Alunos[0].nascimento}
// ENDEREÇO: ${contrato.contratado[0].endereco}
// Nº: ${contrato.contratado[0].numeroCasa}
// BAIRRO: ${contrato.contratado[0].bairro}
// CEP: ${contrato.contratado[0].cep}
// RESPONSÁVEL: ${contrato.contratado[0].nome}
// TELEFONE: ${contrato.contratado[0].telefone}
// CPF: ${contrato.contratado[0].cpf}
// RG: ${contrato.contratado[0].rg}
// ESCOLA: ${contrato.Alunos[0].nomeEscola}
// SÉRIE: ${contrato.Alunos[0].serie}
// TRAJETO: ${contrato.tipoTrajeto === 0 ? 'IDA OU VOLTA' : 'IDA E VOLTA'}
// FORMA DE PAGAMENTO: ${contrato.formaPagamento}
// VALOR TOTAL DO CONTRATO: ${contrato.valorTotal}
// Nº PARCELAS: ${contrato.numeroParcelas}
// VALOR PARCELA: ${contrato.valorParcela}
// DATA PAGAMENTO: ${contrato.dataPagamento}
// DATA CONTRATO: ${contrato.data[0].dia}/${contrato.data[0].mes}/${contrato.data[0].ano}
//             `.trim();

//             // faz a requisição POST
//             const response = await axios.post("http://localhost:1337/relatorio/enviar-email", {
//                 nomeMotorista: contrato.nomeCondutor,
//                 conteudo,
//                 idResponsavel: 2 // ou dinamicamente do contrato
//             });

//             setMongoId(response.data.mongoId);
//             alert("Contrato enviado por e-mail com sucesso!");

//         } catch (err) {
//             console.error(err);
//             alert("Erro ao enviar contrato por e-mail.");
//         }
//     };


//     const baixarPdf = () => {
//         if (!mongoId) return;
//         window.open(`http://localhost:1337/relatorio/baixar/${mongoId}`, "_blank");
//     };

//     return (
//         <section className="w-full h-full flex justify-between">
//             <div className="w-full flex justify-center items-center">
//                 {contrato === null && (
//                     <div className="select-none flex flex-col justify-center items-center">
//                         <p className="text-2xl text-[rgb(70,189,253)]">Não há contratos para serem enviados</p>
//                         <p className="text-sm text-[rgba(70,189,253,0.5)]">Em caso de problemas, entrar em contato com o condutor</p>
//                     </div>
//                 )}
//                 {contrato !== null && (
//                     <div className="flex justify-center items-center space-x-6 w-full h-full">
//                         <div className="w-full max-w-100 h-full max-h-140 flex flex-col justify-center bg-white border-1 border-[#c9c9c9] rounded-xl">
//                             <InfoContrato contrato={contrato} setContrato={setContrato} />
//                             <div className="p-4 space-x-4">
//                                 <button
//                                     onClick={enviarContratoEmail}
//                                     className="bg-green-600 text-white px-4 py-2 rounded"
//                                 >
//                                     Enviar Contrato por E-mail
//                                 </button>
//                                 {mongoId && (
//                                     <button
//                                         onClick={baixarPdf}
//                                         className="bg-gray-700 text-white px-4 py-2 rounded"
//                                     >
//                                         Baixar PDF
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex w-full h-full max-w-182">
//                             <ContratoPreview contrato={contrato} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// VERSÃO QUE ESTAVAM USANDO

// import { useState, useEffect } from "react";
// import axios from "axios";

// /* Imports */
// import ContratoPreview from "./contratoPreview";
// import InfoContrato from "./infoContrato";
// import { getResponsaveis } from "../../../services/responsavelServices";

// export default function ContratoCondutor() {
//     const [contrato, setContrato] = useState(null);
//     const [mongoId, setMongoId] = useState(null);
//     const [responsaveis, setResponsaveis] = useState([]);
//     const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);

//     useEffect(() => {
//         getResponsaveis()
//             .then(setResponsaveis)
//             .catch((err) => console.error("Erro ao buscar responsáveis:", err));
//     }, []);

//     const handleSelecionarResponsavel = (e) => {
//         const id = e.target.value;
//         setResponsavelSelecionado(id);

//         const responsavel = responsaveis.find((r) => r.id == id);
//         if (!responsavel) return;

//         const novoContrato = {
//             nomeCondutor: "",
//             contratado: [
//                 {
//                     nome: responsavel.nome,
//                     endereco: responsavel.endereco || "",
//                     numeroCasa: responsavel.numeroCasa || "",
//                     bairro: responsavel.bairro || "",
//                     cep: responsavel.cep || "",
//                     cpf: responsavel.cpf || "",
//                     rg: responsavel.rg || "",
//                     telefone: responsavel.celular || "",
//                 },
//             ],
//             assinado: false,
//             tipoTrajeto: 1,
//             formaPagamento: "",
//             valorTotal: "",
//             numeroParcelas: "",
//             valorParcela: "",
//             dataPagamento: "",
//             data: [
//                 {
//                     dia: null,
//                     mes: "",
//                     ano: null,
//                 },
//             ],
//             Alunos: [], // preencha depois se quiser integrar alunos
//         };

//         setContrato(novoContrato);
//     };

//     const enviarContratoEmail = async () => {
//         if (!contrato || !responsavelSelecionado) return alert("Preencha o contrato e selecione um responsável.");

//         try {
//             const response = await axios.post("http://localhost:1337/relatorio/enviar-email", {
//                 contrato,
//                 idResponsavel: responsavelSelecionado
//             });

//             setMongoId(response.data.mongoId);
//             alert("Contrato enviado por e-mail com sucesso!");
//         } catch (err) {
//             console.error(err);
//             alert("Erro ao enviar contrato por e-mail.");
//         }
//     };

//     const baixarPdf = () => {
//         if (!mongoId) return;
//         window.open(`http://localhost:1337/relatorio/baixar/${mongoId}`, "_blank");
//     };

//     return (
//         <section className="w-full h-full flex justify-between">
//             <div className="w-full flex justify-center items-center">
//                 {!contrato && (
//                     <div className="select-none flex flex-col justify-center items-center">
//                         <label htmlFor="responsavelSelect" className="text-sm mb-2">Selecionar Responsável:</label>
//                         <select
//                             id="responsavelSelect"
//                             className="w-80 border border-gray-300 rounded px-2 py-1"
//                             value={responsavelSelecionado || ""}
//                             onChange={handleSelecionarResponsavel}
//                         >
//                             <option value="">-- Selecione um responsável --</option>
//                             {responsaveis.map((resp) => (
//                                 <option key={resp.id} value={resp.id}>
//                                     {resp.nome}
//                                 </option>
//                             ))}
//                         </select>
//                         <p className="text-2xl text-[rgb(70,189,253)] mt-6">Nenhum contrato carregado</p>
//                         <p className="text-sm text-[rgba(70,189,253,0.5)]">Selecione um responsável para iniciar</p>
//                     </div>
//                 )}

//                 {contrato && (
//                     <div className="flex justify-center items-center space-x-6 w-full h-full">
//                         <div className="w-full max-w-100 h-full max-h-140 flex flex-col justify-center bg-white border-1 border-[#c9c9c9] rounded-xl">
//                             <InfoContrato contrato={contrato} setContrato={setContrato} />

//                             <div className="px-4 pb-4">
//                                 <label htmlFor="responsavelSelect" className="block text-sm mb-2">
//                                     Selecionar outro Responsável:
//                                 </label>
//                                 <select
//                                     id="responsavelSelect"
//                                     className="w-full border border-gray-300 rounded px-2 py-1"
//                                     value={responsavelSelecionado || ""}
//                                     onChange={handleSelecionarResponsavel}
//                                 >
//                                     <option value="">-- Selecione um responsável --</option>
//                                     {responsaveis.map((resp) => (
//                                         <option key={resp.id} value={resp.id}>
//                                             {resp.nome}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="p-4 space-x-4">
//                                 <button
//                                     onClick={enviarContratoEmail}
//                                     disabled={contrato?.status === "enviado_para_responsavel" || contrato?.status === "assinado_pelo_responsavel"}
//                                     className={`bg-green-600 text-white px-4 py-2 rounded ${contrato?.status === "enviado_para_responsavel" || contrato?.status === "assinado_pelo_responsavel" ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 >
//                                     Enviar Contrato por E-mail
//                                 </button>

//                                 {mongoId && (
//                                     <button
//                                         onClick={baixarPdf}
//                                         className="bg-gray-700 text-white px-4 py-2 rounded"
//                                     >
//                                         Baixar PDF
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex w-full h-full max-w-182">
//                             <ContratoPreview contrato={contrato} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// VERSÃO COM A PARTE DE BUSCA DE CONTRATOS IMPLEMENTADA (FALTANDO TESTAR)
import { useState, useEffect } from "react";
import axios from "axios";

/* Imports */
import ContratoPreview from "./contratoPreview";
import InfoContrato from "./infoContrato";
import { getResponsaveis } from "../../../services/responsavelServices";

export default function ContratoCondutor() {
    const [contrato, setContrato] = useState(null);
    const [mongoId, setMongoId] = useState(null);

    const [responsaveis, setResponsaveis] = useState([]);
    const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);

    const [contratosResponsavel, setContratosResponsavel] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState(""); // PARA CASO QUEIRA FAZER CONSULTA POR FILTRO SEPARADA

    useEffect(() => {
        getResponsaveis()
            .then(setResponsaveis)
            .catch((err) => console.error("Erro ao buscar responsáveis:", err));
    }, []);

    const buscarContratosResponsavel = async (id, status = "") => {
        try {
            const params = { responsavelId: id };
            if (status) params.status = status;

            const response = await axios.get("http://localhost:1337/contrato/listar", { params });
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
        if (!contrato || !responsavelSelecionado) return alert("Preencha o contrato e selecione um responsável.");

        try {
            const response = await axios.post("http://localhost:1337/relatorio/enviar-email", {
                contrato,
                idResponsavel: responsavelSelecionado
            });

            setMongoId(response.data.mongoId);
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

    const renderContratosListados = () => {
        if (!contratosResponsavel.length) return null;

        return (
            <div className="my-6 w-full max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Contratos existentes deste responsável:</h3>
                <ul className="space-y-3">
                    {contratosResponsavel.map((c) => (
                        <li key={c._id} className="border rounded p-4 shadow-sm bg-white">
                            <p><strong>Status:</strong> {c.status || "Sem status"}</p>
                            <p><strong>Criado em:</strong> {new Date(c.dataCriacao).toLocaleDateString()}</p>
                            {c.valorTotal && <p><strong>Valor Total:</strong> R$ {c.valorTotal}</p>}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <section className="w-full h-full flex justify-between">
            <div className="w-full flex flex-col justify-start items-center">
                <div className="mt-8 mb-6 w-80">
                    <label htmlFor="responsavelSelect" className="text-sm mb-2 block">Selecionar Responsável:</label>
                    <select
                        id="responsavelSelect"
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

                {responsavelSelecionado && renderContratosListados()}

                {!contrato && (
                    <div className="text-center mt-8">
                        <p className="text-2xl text-[rgb(70,189,253)]">Nenhum contrato carregado</p>
                        <p className="text-sm text-[rgba(70,189,253,0.5)]">Selecione um responsável para iniciar</p>
                    </div>
                )}

                {contrato && (
                    <div className="flex justify-center items-start space-x-6 w-full h-full">
                        <div className="w-full max-w-100 h-full max-h-140 flex flex-col justify-start bg-white border border-gray-300 rounded-xl">
                            <InfoContrato contrato={contrato} setContrato={setContrato} />

                            <div className="px-4 pb-4">
                                <label htmlFor="responsavelSelect" className="block text-sm mb-2">
                                    Selecionar outro Responsável:
                                </label>
                                <select
                                    id="responsavelSelect"
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
                                    disabled={contrato?.status === "enviado_para_responsavel" || contrato?.status === "assinado_pelo_responsavel"}
                                    className={`bg-green-600 text-white px-4 py-2 rounded ${contrato?.status === "enviado_para_responsavel" || contrato?.status === "assinado_pelo_responsavel" ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            </div>
        </section>
    );
}
