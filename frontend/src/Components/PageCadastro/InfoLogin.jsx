/* Dependencias */
import { useState } from "react";
import { motion} from "framer-motion";
import { Link } from 'react-router-dom';

/* Imports */
import InputSenha from "./inputSenha";
import useValidaEmail from "../../hooks/useValidaEmail"

/* Icons */
import { FcGoogle } from "react-icons/fc";

/* Funções arquivo */
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

export default function InfoLogin({ form, setForm, setEtapa }) {
  const { email, setEmail, invalido: emailInvalido, validarEmail } = useValidaEmail();
  const [erroGeral, setErroGeral] = useState("");

  const [senhaInvalida, setSenhaInvalida] = useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);

  const [camposTocados, setCamposTocados] = useState({
    email: false,
    senha: false,
    confirmarSenha: false
  });

  /* Função que altera os inputs do form */
  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "senha") {
      const valida = validarSenhaForte(value);
      setSenhaInvalida(!valida);
    }

    if (name === "confirmarSenha") {
      setSenhasDiferentes(value !== form.senha);
    } else if (name === "senha") {
      setSenhasDiferentes(form.confirmarSenha && value !== form.confirmarSenha);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* Função para validar se a senha é forte */
  const validarSenhaForte = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  };

  /* Função para evitar problema de messagem de erro constante enquanto escreve */
  const handleBlur = (e) => {
    const { name } = e.target;
    setCamposTocados((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (name === "email") {
      validarEmail(email); // ✅ agora sim!
    }
    if (name === "senha") {
      const valida = validarSenhaForte(form.senha);
      setSenhaInvalida(!valida);
    }
    if (name === "confirmarSenha") {
      const diferentes = form.confirmarSenha !== form.senha;
      setSenhasDiferentes(diferentes);
    }
  };

  /* Função que verifica se todos os campos foram preenchidos e finaliza etapa */
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = validarEmail(email);
    const senhaValida = validarSenhaForte(form.senha);
    const confirmacaoOk = form.senha === form.confirmarSenha;

    const camposVazios = !email.trim() || !form.senha.trim() || !form.confirmarSenha.trim();

    setCamposTocados({
      email: true,
      senha: true,
      confirmarSenha: true
    });

    if (camposVazios) {
      setErroGeral("Preencha todos os campos.");
      return;
    }

    if (!emailValido) {
      setErroGeral("Digite um email válido.");
      return;
    }

    if (!senhaValida) {
      setErroGeral("A senha não atende aos requisitos.");
      return;
    }

    if (!confirmacaoOk) {
      setErroGeral("As senhas não coincidem.");
      return;
    }

    // Se tudo ok, limpa erro e avança
    setErroGeral("");
    setEtapa(1);
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 space-y-2">
        {/* Input Email */}
        <InputAnimado delay={0.1}>
          <div className="select-none">
            <p className="text-[14px] font-light select-none m-1">Email</p>
            <input type="text" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="exemplo@email.com" className={`
            w-full max-w-90
            py-3 px-5
            text-sm text-[#252525]
            placeholder-[#98A2B3]
            appearance-none bg-transparent outline-none 
            border-1 border-[#D0D5DD] rounded-lg
            focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
            transition-all duration-200 ease-in-out
            ${camposTocados.email && emailInvalido 
              ? "border-red-500 focus:border-red-500 focus:bg-red-500/20"
              : "border-[#D0D5DD] focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)]"
            }       
            `}/>
            {camposTocados.email && emailInvalido && (
              <p className="text-sm text-red-500 mt-1">Digite um email válido</p>
            )}
          </div>
        </InputAnimado>

        {/* Container Senha */} 
        <InputAnimado delay={0.2}>
          <InputSenha 
          label="Senha"
          placeholder="Digite sua Senha"
          inputKey="senha"
          value={form.senha}
          onChange={handleChange}
          onBlur={handleBlur}
          error={camposTocados.senha && senhaInvalida && form.senha.trim() !== ""}
          errorMessage="A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo."
          />
        </InputAnimado>

        {/* Container Confirmar Senha */} 
        <InputAnimado delay={0.3}>
          <InputSenha 
          label="Confirmar Senha"
          placeholder="Confirme sua Senha"
          inputKey="confirmarSenha"
          value={form.confirmarSenha}
          onChange={handleChange}
          onBlur={handleBlur}
          error={camposTocados.confirmarSenha && senhasDiferentes && form.confirmarSenha.trim() !== ""}
          errorMessage="As senhas não coincidem."
          />
        </InputAnimado>


        {/* Mensagem de erro se algum campo no foi preenchido */} 
        {erroGeral && (
          <InputAnimado delay={0}>
            <div className="text-red-500 text-sm font-medium text-center mt-3 select-none">
              {erroGeral}
            </div>
          </InputAnimado>
        )}

        <div className="">
          {/* Botão de envio ou próximos passos */}
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
          Avançar Etapa
          </motion.button>

          {/* Botão cadastro com o google */}
          <motion.button
          type="submit"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
              duration: 0.1,
              ease: "easeOut", 
              delay: 0.5
          }}
          className="cursor-pointer mt-3 w-full max-w-90 h-12 rounded-lg flex justify-center items-center space-x-2 bg-[#CBEBFF] hover:bg-[#A1DBFF] transition-all duration-300 ease-in-out transform hover:scale-102">
            <FcGoogle className="text-xl" />
            <p className="text-[#0077FF] font-semibold text-1xl">Continuar com o Google</p>
          </motion.button>

          {/* Botão de redirecionamento para o login */}
          <motion.button
          type="submit"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
              duration: 0.1,
              ease: "easeOut", 
              delay: 0.6
          }}
          className="w-full max-w-90 mt-1 flex space-x-1 font-light text-[14px] flex justify-end select-none">
            <p>Já tem uma conta?</p>
            <Link href={"/cadastro"} className="inline-block font-semibold text-[rgba(3,105,161,1)] transition-transform transform hover:scale-110">Log in</Link>
          </motion.button>
        </div>
    </form>
  );
}
