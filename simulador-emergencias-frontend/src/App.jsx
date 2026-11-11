import { useEffect, useState } from "react";
import { verificarBackend } from "./services/Api";

function App() {
  const [estado, setEstado] = useState("Conectando con el servidor...");

  useEffect(() => {
    verificarBackend()
      .then((datos) => {
        setEstado(datos.message);
      })
      .catch(() => {
        setEstado("No se pudo conectar con el backend");
      });
  }, []);

  return (
    <main>
      <h1>Simulador Educativo de Emergencias</h1>
      <p>Colegio Comfandi El Prado</p>
      <p>Desarrollado por SOLUTIONS S.A.S.</p>

      <h2>Estado del backend:</h2>
      <p>{estado}</p>
    </main>
  );
}

export default App;