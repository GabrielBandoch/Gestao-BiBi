// services/responsavelServices.js
const API_URL = import.meta.env.VITE_API_URL;

export async function getResponsaveis() {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/usuario/responsaveis`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao buscar responsáveis');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar responsáveis:', error.message);
    throw error;
  }
}
