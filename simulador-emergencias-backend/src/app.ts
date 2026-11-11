import express from "express";
import cors from "cors";

const app = express();

// Permitir peticiones desde nuestro frontend
app.use(cors({
  origin: "http://localhost:5173"
}));

// Permitir recibir datos en formato JSON
app.use(express.json());

// Ruta para comprobar que el backend funciona
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API del Simulador de Emergencias funcionando"
  });
});

export default app;