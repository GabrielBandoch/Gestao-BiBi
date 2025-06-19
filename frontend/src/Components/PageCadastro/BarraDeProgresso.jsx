/* Dependencias */
import { motion, AnimatePresence } from "framer-motion";

/* Icons */
import { FaCheck } from "react-icons/fa";

export default function BarraDeProgresso({ indexEtapa }) {
  const etapaAtual = indexEtapa;
  const etapas = [
    { numero: '01', texto: 'Informações de login' },
    { numero: '02', texto: 'Verificar Email' },
    { numero: '03', texto: 'Informações adicionais' },
  ];

  return (
    <div className="flex overflow-hidden rounded-full border border-gray-300 divide-x divide-gray-200 shadow-sm select-none">
      {etapas.map((etapa, i) => {
        const completa = i < etapaAtual;
        const ativa = i === etapaAtual;

        return (
          <div key={i} className={`
          relative flex items-center px-4 py-2 text-[10px] font-medium
          ${ativa ? 'text-[#1267A0]' : completa ? 'text-[#252525]' : 'text-gray-400'}
          bg-white
          `}>
            <motion.span
              className={`
                mr-1 inline-flex h-5 w-5 items-center justify-center rounded-full border 
                ${completa ? 'bg-[#1267A0] text-white border-[#1267A0]' : ativa ? 'border-[#1267A0] text-[#1267A0]' : 'border-gray-300 text-gray-400'}
                text-[10px] font-semibold
              `}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {completa ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCheck className="text-[8px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="numero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {etapa.numero}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
            {etapa.texto}
          </div>
        );
      })}
    </div>
  );
}
