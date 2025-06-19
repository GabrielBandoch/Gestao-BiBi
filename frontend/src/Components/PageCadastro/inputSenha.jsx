"use client";
/* Dependencias */
import { useState } from "react";

/* Icons */
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";

export default function InputSenha({ label, placeholder, inputKey, value, onChange, onBlur, error = false, errorMessage = ""}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-90 space-y-1 relative">
      {/* Title */}
      <p className="text-sm font-light m-1 select-none">{label}</p>

      {/* Input container */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={inputKey}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full
            py-3 px-5
            text-sm text-[#252525]
            placeholder-[#98A2B3]
            appearance-none bg-transparent outline-none 
            border-1 border-[#D0D5DD] rounded-lg
            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
            transition-all duration-200 ease-in-out
            peer
            ${error
              ? "border-red-500 focus:border-red-500 focus:bg-red-500/20"
              : "border-[#D0D5DD] focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)]"
            }
          `}
        />

        {/* Ícone */}
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="cursor-pointer absolute right-3 top-3/5 -translate-y-1/2 text-[rgba(3,105,161,1)] hover:text-[rgba(3,105,161,0.8)] transition-transform duration-300"
        >
        <span className="inline-block transition-transform duration-200 ease-in-out transform hover:scale-110">
            {showPassword ? <RiEyeCloseLine key="close" size={22} /> : <RiEye2Line key="open" size={22} />}
        </span>
        </button>
      </div>
      {/* Mensagem de erro se o campo estiver incorreto */}
      {error && (
        <p className="text-sm text-red-500 select-none">{errorMessage}</p>
      )}
    </div>
  );
}
