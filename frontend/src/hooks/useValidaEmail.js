import { useState } from "react";

export default function useValidaEmail() {
    const [email, setEmail] = useState("");
    const [invalido, setInvalido] = useState(false);

    const validarEmail = (valor) => {
    setEmail(valor);

    // Se estiver vazio, não marcar como inválido ainda
    if (!valor.trim()) {
        setInvalido(false);
        return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = regex.test(valor);
    setInvalido(!valido);
    return valido;
    };

    return {
        email,
        setEmail,
        invalido,
        validarEmail,
    };
}
