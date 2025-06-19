/* Dependencias */
import { useState } from 'react';
import { motion } from "framer-motion";

/* Imports */
import DropdowmEscolas from './dropdowmEscolas';

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

export default function InfoAdicionais({ form, setForm, handleSubmit }) {

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
        const {name, value} = e.target;

        let novoValor = value;

        if (name === "celular") {
            novoValor = formatarCelular(value);
        }

        if (name === "cpf") {
            novoValor = formatarCPF(value);
        }
        
        setForm((prev) => ({
        ...prev,
        [name]: novoValor,
        }));
    };

  return (
     <form onSubmit={handleSubmit} className="flex flex-col px-8">
        {/* Container de botões para trocar role */}
        <div className='flex justify-between w-full max-w-90'>
            {/* Botão Informações condutor */}
            <div onClick={() => { setForm(prev => ({...prev,role: 'condutor'}));}} className={`
            w-full max-w-40
            flex justify-center items-center
            py-2
            rounded-lg
            text-white font-semibold text-lg
            cursor-pointer
            hover:bg-[rgba(3,105,161,1)] 
            transition-all duration-300 ease-in-out
            ${form.role === 'condutor'
                ? "bg-[rgba(3,105,161,1)] scale-105"
                : "bg-[rgba(3,105,161,0.9)]"
            } 
            `}>
                Condutor
            </div>
            
            {/* Botão Informações Responsável */}
            <div onClick={() => { setForm(prev => ({...prev,role: 'responsavel'}));}} className={`
            w-full max-w-40
            flex justify-center items-center
            py-2
            bg-[rgba(3,105,161,0.9)]
            rounded-lg
            text-white font-semibold text-lg
            cursor-pointer
            hover:bg-[rgba(3,105,161,1)] 
            transition-all duration-300 ease-in-out
            ${form.role === 'responsavel'
                ? "bg-[rgba(3,105,161,1)] scale-105"
                : "bg-[rgba(3,105,161,0.9)]"
            } 
            `}>
                Responsável
            </div>
        </div>
        
        {/* Container de inputs para condutor */}
        {form.role === "condutor" && (
            <div className='space-y-3 mt-5'>
                {/* Input Nome Completa */}
                <InputAnimado delay={0.1}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Nome Completo</p>
                        <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Digite seu nome completo" className={`
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

                {/* Input CPF */}
                <InputAnimado delay={0.3}>
                <div className="select-none">
                    <p className="text-[14px] font-light select-none m-1">CPF</p>
                    <input type="text" maxLength={14} name="cpf" value={form.cpf} onChange={handleChange} placeholder="Digite seu CPF" className={`
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

                {/* Input Celular */}
                <InputAnimado delay={0.5}>
                <div className="select-none">
                    <p className="text-[14px] font-light select-none m-1">Celular</p>
                    <input type="text" maxLength={15} name="celular" value={form.celular} onChange={handleChange} placeholder="Digite seu celular" className={`
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
                
                {/* Input Escolas Associadas */}
                <InputAnimado delay={0.7}>
                    <DropdowmEscolas />
                </InputAnimado>
                

            </div>
        )}

        {/* Container de inputs para responsavel */}
        {form.role === "responsavel" && (
            <div className='space-y-3 mt-5'>
               {/* Input Nome Completa */}
                <InputAnimado delay={0.1}>
                    <div className="select-none">
                        <p className="text-[14px] font-light select-none m-1">Nome Completo</p>
                        <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Digite seu nome completo" className={`
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

                {/* Input CPF */}
                <InputAnimado delay={0.3}>
                <div className="select-none">
                    <p className="text-[14px] font-light select-none m-1">CPF</p>
                    <input type="text" maxLength={14} name="cpf" value={form.cpf} onChange={handleChange} placeholder="Digite seu CPF" className={`
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

                {/* Input Celular */}
                <InputAnimado delay={0.5}>
                <div className="select-none">
                    <p className="text-[14px] font-light select-none m-1">Celular</p>
                    <input type="text" maxLength={15} name="celular" value={form.celular} onChange={handleChange} placeholder="Digite seu celular" className={`
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

        {/* Botão para Finalizar Cadastro */}
        <motion.button
        key={form.role}
        type="submit"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
            duration: 0.1,
            ease: "easeOut", 
            delay: 0.9 
        }}
        className="
            w-full max-w-90 
            bg-[rgba(3,105,161,0.9)]
            py-2 mt-5
            text-white text-xl font-semibold
            rounded-lg
            cursor-pointer
            hover:bg-[rgba(3,105,161,1)] hover:scale-102
            transition-all duration-300 ease-in-out
            select-none
        "
        >
        Finalizar Cadastro
        </motion.button>
    </form>
  );
}
