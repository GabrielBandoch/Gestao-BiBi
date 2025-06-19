/* Dependencias */
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

/* Icons */
import { IoIosArrowDown } from "react-icons/io";

/* Mock Escolas */
const escolasDisponiveis = [
  "Escola Alfa", "Escola Beta", "Escola Gama", "Escola Delta", "Escola Ômega"
];

export default function DropdowmEscolas() {
  const [aberto, setAberto] = useState(false);
  const [selecionadas, setSelecionadas] = useState([]);

  /* Função que marca selecao de escolas */
  const toggleSelecao = (escola) => {
    setSelecionadas(prev =>
      prev.includes(escola)
        ? prev.filter(e => e !== escola) // desmarca
        : [...prev, escola] // marca
    );
  };

  return (
    <div className="w-full max-w-90 text-[14px] relative select-none">
      {/* Title */}
      <p className='text-sm font-light m-1 select-none'>Associado as escolas</p>

      {/* Botão dropdown */}
      <div onClick={() => setAberto(!aberto)} className={`
      flex justify-between items-center
      px-5 py-3 
      border rounded-lg 
      text-[#0369A1] 
      cursor-pointer
      group
      hover:bg-[rgba(186,230,253,0.10)] hover:border-[#BAE6FD]
      transition-all duration-300 ease-in-out
      ${aberto ? 'bg-[rgba(186,230,253,0.10)] border-[#BAE6FD]' : 'border-[#D0D5DD]'}
      `}>
        <span>Escolha as escolas que está associado</span>
        <span className={`
          text-xl
          transition-all duration-500 ease-in-out
          ${aberto ? 'rotate-180' : 'group-hover:rotate-180'}
          `}><IoIosArrowDown /></span>
      </div>

      {/* Lista suspensa */}
      <AnimatePresence>
        {aberto && (
          <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 120 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="
          w-full
          absolute 
          overflow-y-auto 
          p-2 mt-1 
          bg-white
          border border-[#D0D5DD] rounded-lg  
          ">
            {escolasDisponiveis.map((escola) => {
              const selecionado = selecionadas.includes(escola);
              return (
                <div
                  key={escola}
                  onClick={() => toggleSelecao(escola)}
                  className={`
                    flex justify-between items-center
                    px-3 py-2 
                    cursor-pointer 
                    rounded-lg
                    transition-all duration-300 ease-in-out
                    ${selecionado ? 'bg-[rgba(186,230,253,0.30)] text-[#0369A1]' : 'hover:bg-[rgba(186,230,253,0.30)] hover:text-[#0369A1] text-[#252525]'}
                  `}
                >
                  <span>{escola}</span>
                  

                  {/* Checkbox escondido (mantido para acessibilidade) */}
                  <input
                    type="checkbox"
                    checked={selecionado}
                    onChange={() => {}}
                    className="hidden"
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
