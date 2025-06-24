// /* Dependencias */
// import { useState } from "react";
// import { motion} from "framer-motion";
// import { Link } from 'react-router-dom';


// /* Imports */
// import InputSenha from "../PageCadastro/inputSenha";

// /* Icons */
// import { FcGoogle } from "react-icons/fc";

// /* Funções arquivo */
// const InputAnimado = ({ children, delay = 0 }) => {
//   const [animou, setAnimou] = useState(false);

//   return (
//     <motion.div
//       initial={!animou ? { opacity: 0, y: -10 } : false}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{
//         type: "spring",
//         stiffness: 40,
//         damping: 10,
//         delay,
//       }}
//       onAnimationComplete={() => setAnimou(true)}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default function FormLogin({ form, setForm, setEtapa }) {
//   const [erroGeral, setErroGeral] = useState("");

//   const [senhaInvalida, setSenhaInvalida] = useState(false);

//   const [camposTocados, setCamposTocados] = useState({
//     email: false,
//     senha: false,
//   });

//   /* Função que altera os inputs do form */
//   const handleChange = (e) => {
//     const {name, value} = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   /* Função que verifica se todos os campos foram preenchidos e finaliza etapa */
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const camposVazios = !email.trim() || !form.senha.trim() || !form.confirmarSenha.trim();

//     setCamposTocados({
//       email: true,
//       senha: true,
//     });

//     if (camposVazios) {
//       setErroGeral("Preencha todos os campos.");
//       return;
//     }
//     // Se tudo ok, limpa erro e avança
//     setErroGeral("");
//     setEtapa(1);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="px-8 space-y-2">
//         {/* Input Email */}
//         <InputAnimado delay={0.1}>
//           <div className="select-none">
//             <p className="text-[14px] font-light select-none m-1">Email</p>
//             <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="exemplo@email.com" className={`
//             w-full max-w-90
//             py-3 px-5
//             text-sm text-[#252525]
//             placeholder-[#98A2B3]
//             appearance-none bg-transparent outline-none 
//             border-1 border-[#D0D5DD] rounded-lg
//             focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
//             transition-all duration-200 ease-in-out
//             ${camposTocados.email && emailInvalido 
//               ? "border-red-500 focus:border-red-500 focus:bg-red-500/20"
//               : "border-[#D0D5DD] focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)]"
//             }       
//             `}/>
//             {camposTocados.email && emailInvalido && (
//               <p className="text-sm text-red-500 mt-1">Digite um email válido</p>
//             )}
//           </div>
//         </InputAnimado>

//         {/* Container Senha */} 
//         <InputAnimado delay={0.2}>
//           <InputSenha 
//           label="Senha"
//           placeholder="Digite sua Senha"
//           inputKey="senha"
//           value={form.senha}
//           onChange={handleChange}
//           error={camposTocados.senha && form.senha.trim() !== ""}
//           errorMessage="A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo."
//           />
//         </InputAnimado>

//         {/* Mensagem de erro se algum campo no foi preenchido */} 
//         {erroGeral && (
//           <InputAnimado delay={0}>
//             <div className="text-red-500 text-sm font-medium text-center mt-3 select-none">
//               {erroGeral}
//             </div>
//           </InputAnimado>
//         )}

//         <div className="">
//           {/* Botão para fazer login */}
//           <motion.button
//           key={form.role}
//           type="submit"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{
//               duration: 0.1,
//               ease: "easeOut", 
//               delay: 0.4 
//           }}
//           className="
//               w-full max-w-90 
//               bg-[rgba(3,105,161,0.9)]
//               py-2 mt-5
//               text-white text-xl font-semibold
//               rounded-lg
//               cursor-pointer
//               hover:bg-[rgba(3,105,161,1)] hover:scale-102
//               transition-all duration-300 ease-in-out
//               select-none
//           "
//           >
//           Avançar Etapa
//           </motion.button>

//           {/* Botão cadastro com o google */}
//           <motion.button
//           type="submit"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{
//               duration: 0.1,
//               ease: "easeOut", 
//               delay: 0.5
//           }}
//           className="cursor-pointer mt-3 w-full max-w-90 h-12 rounded-lg flex justify-center items-center space-x-2 bg-[#CBEBFF] hover:bg-[#A1DBFF] transition-all duration-300 ease-in-out transform hover:scale-102">
//             <FcGoogle className="text-xl" />
//             <p className="text-[#0077FF] font-semibold text-1xl">Continuar com o Google</p>
//           </motion.button>

//           {/* Botão de redirecionamento para o cadastro */}
//           <motion.button
//           type="submit"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{
//               duration: 0.1,
//               ease: "easeOut", 
//               delay: 0.6
//           }}
//           className="w-full max-w-90 mt-1 flex space-x-1 font-light text-[14px] flex justify-end select-none">
//             <p>Não tem uma conta?</p>
//             <Link to={"/login"} className="inline-block font-semibold text-[rgba(3,105,161,1)] transition-transform transform hover:scale-110">Registrar</Link>
//           </motion.button>
//         </div>
//     </form>
//   );
// }


// separação

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../services/userServices';
import InputSenha from "../PageCadastro/inputSenha";
import { FcGoogle } from "react-icons/fc";

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

export default function FormLogin({ form, setForm, setEtapa }) {
  const [erroGeral, setErroGeral] = useState("");
  const [camposTocados, setCamposTocados] = useState({
    email: false,
    senha: false,
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCamposTocados({
      email: true,
      senha: true,
    });

    if (!form.email.trim() || !form.senha.trim()) {
      setErroGeral("Preencha todos os campos.");
      return;
    }

    try {
      setErroGeral("");

      const dados = await loginUser({
        email: form.email,
        senha: form.senha
      });

      console.log("✅ Login realizado:", dados);

      // ✅ Redirecionar após login com sucesso
      navigate("/painel/contrato");
    } catch (error) {
      console.error("Erro no login:", error.message);
      setErroGeral(error.message || "Erro ao fazer login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 space-y-2">
      {/* Input Email */}
      <InputAnimado delay={0.1}>
        <div className="select-none">
          <p className="text-[14px] font-light select-none m-1">Email</p>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemplo@email.com"
            className="w-full max-w-90 py-3 px-5 text-sm text-[#252525] placeholder-[#98A2B3] appearance-none bg-transparent outline-none border-1 border-[#D0D5DD] rounded-lg focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent transition-all duration-200 ease-in-out"
          />
        </div>
      </InputAnimado>

      {/* Senha */}
      <InputAnimado delay={0.2}>
        <InputSenha
          label="Senha"
          placeholder="Digite sua Senha"
          inputKey="senha"
          value={form.senha}
          onChange={handleChange}
          error={camposTocados.senha && form.senha.trim() === ""}
          errorMessage="A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo."
        />
      </InputAnimado>

      {/* Erro geral */}
      {erroGeral && (
        <InputAnimado delay={0}>
          <div className="text-red-500 text-sm font-medium text-center mt-3 select-none">
            {erroGeral}
          </div>
        </InputAnimado>
      )}

      <div className="">
        {/* Botão Login */}
        <motion.button
          key={form.role}
          type="submit"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
            delay: 0.4
          }}
          className="w-full max-w-90 bg-[rgba(3,105,161,0.9)] py-2 mt-5 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-[rgba(3,105,161,1)] hover:scale-102 transition-all duration-300 ease-in-out select-none"
        >
          Avançar Etapa
        </motion.button>

        {/* Google Login */}
        <motion.button
          type="button"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
            delay: 0.5
          }}
          className="cursor-pointer mt-3 w-full max-w-90 h-12 rounded-lg flex justify-center items-center space-x-2 bg-[#CBEBFF] hover:bg-[#A1DBFF] transition-all duration-300 ease-in-out transform hover:scale-102"
        >
          <FcGoogle className="text-xl" />
          <p className="text-[#0077FF] font-semibold text-1xl">Continuar com o Google</p>
        </motion.button>

        <motion.button
          type="button"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
            delay: 0.6
          }}
          className="w-full max-w-90 mt-1 flex space-x-1 font-light text-[14px] justify-end select-none"
        >
          <p>Não tem uma conta?</p>
          <Link to="/cadastro" className="inline-block font-semibold text-[rgba(3,105,161,1)] transition-transform transform hover:scale-110">
            Registrar
          </Link>
        </motion.button>
      </div>
    </form>
  );
}
