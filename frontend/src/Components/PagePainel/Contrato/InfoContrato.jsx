/* Dependencias */
import { useState } from 'react';
import { motion } from "framer-motion";

/* Imports */

/* Funções do arquivo */
const InputAnimado = ({ children, delay = 0 }) => {
  const [animou, setAnimou] = useState(false);

  return (
    <motion.div
      initial={!animou ? { opacity: 0, y: -10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 10,
        delay,
      }}
      onAnimationComplete={() => setAnimou(true)}
    >
      {children}
    </motion.div>
  );
};

export default function InfoContrato({ contrato, setContrato }) {

    const [tipoDado, setTipoDado] = useState("");

    /* Função para formatar texto em padrão de celular */
    function formatarCelular(valor) {
        return valor
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    }

    /* Função para formatar texto em padrão de CPF */
    function formatarCPF(cpf) {
        return cpf
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    /* Função para mudar valor dos inputs */
    const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name.includes("celular") || name.includes("telefone")) {
        novoValor = formatarCelular(value);
    }

    if (name.includes("cpf")) {
        novoValor = formatarCPF(value);
    }

    if (name.startsWith("contratado.")) {
        const campo = name.split(".")[1];
        setContrato((prev) => {
        const novoContratado = [...prev.contratado];
        novoContratado[0] = {
            ...novoContratado[0],
            [campo]: novoValor,
        };
        return {
            ...prev,
            contratado: novoContratado,
        };
        });
    } else if (name.startsWith("aluno.")) {
        const campo = name.split(".")[1];
        setContrato((prev) => {
        const novosAlunos = [...prev.Alunos];
        novosAlunos[0] = {
            ...novosAlunos[0],
            [campo]: novoValor,
        };
        return {
            ...prev,
            Alunos: novosAlunos,
        };
        });
    } else {
        setContrato((prev) => ({
        ...prev,
        [name]: novoValor,
        }));
    }
    };


  return (
     <form className="flex flex-col w-full h-full overflow-y-auto px-5 py-3 space-y-2">
        
        {/* Container Contratante */}
        <div>
            <button type='button' onClick={() => {setTipoDado(prev => prev === "" ? "contratante" : "");}} className={`
            w-full 
            py-2
            rounded-lg
            cursor-pointer
            hover:scale-105
            transition-all duration-300 ease-in-out transform
            ${tipoDado === "contratante" ? "bg-[rgba(3,105,161,1)] text-white" : "bg-gray-100"}
            `}>
                Dados Contratante
            </button>

            {tipoDado === "contratante" && (
                /* Input de nome */
                <InputAnimado delay={0.1}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Nome Completo</p>
                        <input type="text" name="nomeCondutor" value={contrato.nomeCondutor} onChange={handleChange} placeholder="Digite seu nome completo" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>
            )}


        </div>

        {/* Container Contratado */}
        <div>
            <button type='button' onClick={() => {setTipoDado(prev => prev === "" ? "contratado" : "");}} className={`
            w-full 
            py-2
            rounded-lg
            cursor-pointer
            hover:scale-105
            transition-all duration-300 ease-in-out transform
            ${tipoDado === "contratado" ? "bg-[rgba(3,105,161,1)] text-white" : "bg-gray-100"}
            `}>
                Dados Contratado
            </button>

            {tipoDado === "contratado" && (
            <div>
                {/* Input de endereco */}
                <InputAnimado delay={0.1}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Endereço</p>
                        <input type="text" name="contratado.endereco" value={contrato.contratado[0].endereco} onChange={handleChange} placeholder="Digite o endereco do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de Numero da casa */}
                <InputAnimado delay={0.2}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Numero da Casa</p>
                        <input type="text" name="contratado.numeroCasa" value={contrato.contratado[0].numeroCasa} onChange={handleChange} placeholder="Digite o numero da casa do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de Bairro */}
                <InputAnimado delay={0.3}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Bairro</p>
                        <input type="text" name="contratado.bairro" value={contrato.contratado[0].bairro} onChange={handleChange} placeholder="Digite o bairro do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de CEP */}
                <InputAnimado delay={0.4}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">CEP</p>
                        <input type="text" name="contratado.cep" value={contrato.contratado[0].cep} onChange={handleChange} placeholder="Digite o cep do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de nome */}
                <InputAnimado delay={0.5}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Nome Completo</p>
                        <input type="text" name="contratado.nome" value={contrato.contratado[0].nome} onChange={handleChange} placeholder="Digite o nome completo do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de Telefone */}
                <InputAnimado delay={0.6}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Telefone</p>
                        <input type="text" name="contratado.telefone" value={contrato.contratado[0].telefone} onChange={handleChange} placeholder="Digite o telefone do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de CPF */}
                <InputAnimado delay={0.7}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">CPF</p>
                        <input type="text" name="contratado.cpf" value={contrato.contratado[0].cpf} onChange={handleChange} placeholder="Digite o CPF do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>

                {/* Input de RG */}
                <InputAnimado delay={0.8}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">RG</p>
                        <input type="text" name="contratado.rg" value={contrato.contratado[0].rg} onChange={handleChange} placeholder="Digite o RG do contratado" className={`
                        w-full max-w-90
                        py-3 px-5
                        text-sm text-[#252525]
                        placeholder-[#98A2B3]
                        appearance-none bg-transparent outline-none 
                        border-1 border-[#D0D5DD] rounded-lg
                        focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                        transition-all duration-200 ease-in-out      
                        `}/>
                    </div>
                </InputAnimado>
            </div>
            )}

        </div>

        {/* Container Aluno */}
        <div>
            <button type='button' onClick={() => {setTipoDado(prev => prev === "" ? "aluno" : "");}} className={`
            w-full 
            py-2
            rounded-lg
            cursor-pointer
            hover:scale-105
            transition-all duration-300 ease-in-out transform
            ${tipoDado === "aluno" ? "bg-[rgba(3,105,161,1)] text-white" : "bg-gray-100"}
            `}>
                Dados Aluno
            </button>

            {tipoDado === "aluno" && (
                <div>
                    {/* Input de nome */}
                    <InputAnimado delay={0.1}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Nome Completo</p>
                            <input type="text" name="aluno.nome" value={contrato.Alunos[0].nome} onChange={handleChange} placeholder="Digite o nome completo do aluno" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>
                    
                    {/* Input de data de nascimento */}
                    <InputAnimado delay={0.2}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Data de Nascimento</p>
                            <input type="text" name="aluno.nascimento" value={contrato.Alunos[0].nascimento} onChange={handleChange} placeholder="Digite a data de nascimento do aluno" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>

                    {/* Input de Escola */}
                    <InputAnimado delay={0.3}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Escola</p>
                            <input type="text" name="aluno.nomeEscola" value={contrato.Alunos[0].nomeEscola} onChange={handleChange} placeholder="Digite o nome da escola do aluno" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>

                    {/* Input de Série */}
                    <InputAnimado delay={0.4}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Série</p>
                            <input type="text" name="aluno.serie" value={contrato.Alunos[0].serie} onChange={handleChange} placeholder="Digite a série do aluno" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>
                </div>
            )}










        </div>

        {/* Container Trajeto */}
        <div>
            <button type='button' onClick={() => {setTipoDado(prev => prev === "" ? "trajeto" : "");}} className={`
            w-full 
            py-2
            rounded-lg
            cursor-pointer
            hover:scale-105
            transition-all duration-300 ease-in-out transform
            ${tipoDado === "trajeto" ? "bg-[rgba(3,105,161,1)] text-white" : "bg-gray-100"}
            `}>
                Dados Trajeto
            </button>

            {tipoDado === "trajeto" && (
                /* Input de Tipo de Trajeto */
                <InputAnimado delay={0.1}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Trajeto</p>

                        <div className="flex gap-5 bg-white border border-[#D0D5DD] rounded-lg py-3 px-5 text-sm text-[#252525]">
                        <div
                            onClick={() => setContrato((prev) => ({ ...prev, tipoTrajeto: 0 }))}
                            className="cursor-pointer flex items-center gap-1"
                        >
                            <span className="font-bold text-[#98A2B3]">( {contrato.tipoTrajeto === 0 ? "X" : " "} )</span>
                            <span className="text-sm text-[#98A2B3]">IDA OU VOLTA</span>
                        </div>

                        <div
                            onClick={() => setContrato((prev) => ({ ...prev, tipoTrajeto: 1 }))}
                            className="cursor-pointer flex items-center gap-1"
                        >
                            <span className="font-bold text-[#98A2B3]">( {contrato.tipoTrajeto === 1 ? "X" : " "} )</span>
                            <span className="text-sm text-[#98A2B3]">IDA E VOLTA</span>
                        </div>
                        </div>
                    </div>
                </InputAnimado>
            )}



        </div>

        {/* Container Aluno */}
        <div>
            <button type='button' onClick={() => {setTipoDado(prev => prev === "" ? "pagamento" : "");}} className={`
            w-full 
            py-2
            rounded-lg
            cursor-pointer
            hover:scale-105
            transition-all duration-300 ease-in-out transform
            ${tipoDado === "pagamento" ? "bg-[rgba(3,105,161,1)] text-white" : "bg-gray-100"}
            `}>
                Dados de Pagamento
            </button>

            {tipoDado === "pagamento" && (
                <div>
                    {/* Input forma de pagamento */}
                    <InputAnimado delay={0.1}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Forma de Pagamento</p>
                            <input type="text" name="formaPagamento" value={contrato.formaPagamento} onChange={handleChange} placeholder="Digite a forma de pagamento" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>

                    {/* Input valor total do contrato */}
                    <InputAnimado delay={0.1}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Valor Total</p>
                            <input type="text" name="valorTotal" value={contrato.valorTotal} onChange={handleChange} placeholder="Digite o valor total do contrato" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>

                    {/* Input de Número de Parcelas */}
                    <InputAnimado delay={0.2}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Número de Parcelas</p>
                            <input type="text" name="numeroParcelas" value={contrato.numeroParcelas} onChange={handleChange} placeholder="Digite o número de parcelas" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>

                    {/* Input de Valor de Parcelas */}
                    <InputAnimado delay={0.3}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Valor Parcelado</p>
                            <input type="text" name="valorParcela" value={contrato.valorParcela} onChange={handleChange} placeholder="Digite o valor parcelado" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>

                    {/* Input de Data de Pagamento */}
                    <InputAnimado delay={0.4}>
                        <div className="select-none">
                            <p className="text-[14px] font-light select-none m-1">Data de Pagamento</p>
                            <input type="text" name="dataPagamento" value={contrato.dataPagamento} onChange={handleChange} placeholder="Digite a data de pagamento" className={`
                            w-full max-w-90
                            py-3 px-5
                            text-sm text-[#252525]
                            placeholder-[#98A2B3]
                            appearance-none bg-transparent outline-none 
                            border-1 border-[#D0D5DD] rounded-lg
                            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
                            transition-all duration-200 ease-in-out      
                            `}/>
                        </div>
                    </InputAnimado>
                </div>
            )}
        </div>

    </form>
  );
}
