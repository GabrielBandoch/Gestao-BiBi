const API_URL = import.meta.env.VITE_API_URL;

/**
 * Cadastra um novo usuário no sistema
 */
export default async function registerUser(userData) {
  try {
    console.log('📤 Dados enviados para o backend (registerUser):', userData);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    console.log('📥 Status da resposta:', response.status);

    const data = await response.json();
    console.log('📥 Dados recebidos da API:', data);

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao cadastrar usuário');
    }

    return data;
  } catch (error) {
    console.error('❌ Erro em registerUser:', error.message);
    throw error;
  }
}

/**
 * Faz login do usuário e armazena o token JWT
 */
export async function loginUser({ email, senha }) {
  try {
    console.log('🚀 Enviando login com:', { email, senha });

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    console.log('📥 Status da resposta login:', response.status);
    const data = await response.json();
    console.log('📥 Dados recebidos no login:', data);

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao fazer login');
    }

    if (data.token) {
      console.log('💾 Salvando token:', data.token);
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.error('❌ Erro em loginUser:', error.message);
    throw error;
  }
}

/**
 * Retorna os dados do usuário logado (requisição com token)
 */
export async function getUserProfile() {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao buscar perfil do usuário');
    }

    return data;
  } catch (error) {
    console.error('Erro em getUserProfile:', error.message);
    throw error;
  }
}

/**
 * Remove o token do armazenamento local
 */
export function logoutUser() {
  localStorage.removeItem('token');
}


export async function enviarCodigoVerificacao(email) {
  const res = await fetch(`${API_URL}/api/usuario/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error('Falha ao enviar código');
  return res.json();
}

export async function validarCodigo(email, code) {
  const res = await fetch(`${API_URL}/api/usuario/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  return res.json();
}

