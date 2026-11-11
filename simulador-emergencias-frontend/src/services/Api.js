const API_URL = "http://localhost:3000/api";

export async function verificarBackend() {
  const respuesta = await fetch(`${API_URL}/health`);

  if (!respuesta.ok) {
    throw new Error("Error al conectar con el backend");
  }

  return respuesta.json();
}