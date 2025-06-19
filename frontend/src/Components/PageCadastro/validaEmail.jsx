/* Dependencias */
import { useRef } from "react";
import { Link } from 'react-router-dom';

export default function ValidaEmail({ form, setEtapa }) {
  const inputsRef = useRef([]);

  /* Função para alterar valor dos inputs */
  const handleChange = (e, i) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (i < inputsRef.current.length - 1) {
        inputsRef.current[i + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  /* Função para apagar inputs corretamente */
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (i > 0) {
        inputsRef.current[i - 1].focus();
      }
    }
  };

  /* Função para passar para a proxima etapa */
  const handleSubmit = (e) => {
    e.preventDefault();

    setEtapa(2);
  }

  return (
     <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Container Inputs */}
        <div className="flex mt-3 space-x-3 px-8">
            {Array(4).fill(0).map((_, i) => (
            <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                inputMode="numeric"
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="
                w-20 h-24
                text-center text-[rgba(3,105,161,1)] text-2xl font-semibold
                bg-[rgba(186,230,253,0.30)]
                border-1 rounded-lg
                outline-none appearance-none
                focus:bg-[rgba(186,230,253,0.50)]
                transition-all duration-200 ease-in-out
                [-moz-appearance:textfield]
                "
            />
            ))}
        </div>
        
        {/* Legenda */}
        <p className="text-sm font-light mt-1 select-none px-8">Insira o codigo de 4 digitos enviado para seu email.</p>
        
        {/* Botão de envio ou próximos passos */}
        <button
        type="submit"
        className="
        w-full max-w-90 
        bg-[rgba(3,105,161,0.9)]
        mx-8 py-2 mt-4
        text-white text-xl font-semibold
        rounded-lg
        cursor-pointer
        hover:bg-[rgba(3,105,161,1)] hover:scale-102
        transition-all duration-300 ease-in-out
        select-none
        ">
        Avançar Etapa
        </button>

        {/* Botão para reenviar codigo */}
        <div className="w-full max-w-90 mt-1 flex space-x-1 font-light text-[14px] flex justify-end select-none">
            <p>Não recebeu o Codigo?</p>
            <Link href={"/cadastro"} className="inline-block font-semibold text-[rgba(3,105,161,1)] transition-transform transform hover:scale-110">Reenviar</Link>
        </div>
    </form>
  );
}
