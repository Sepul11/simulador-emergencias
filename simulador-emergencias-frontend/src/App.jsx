import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SimulacionProvider } from './context/SimulacionContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import InfoSeguridadPage from './pages/InfoSeguridadPage'
import SimulacionesPage from './pages/SimulacionesPage'
import EscenaPage from './pages/EscenaPage'
import ResultadoPage from './pages/ResultadoPage'
import GuiaPage from './pages/GuiaPage'
import EstadisticasPage from './pages/EstadisticasPage'
import EditorPage from './pages/EditorPage'
import EditorEscenarioPage from './pages/EditorEscenarioPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SimulacionProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas protegidas */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/info-seguridad" element={<ProtectedRoute><InfoSeguridadPage /></ProtectedRoute>} />
            <Route path="/simulaciones" element={<ProtectedRoute><SimulacionesPage /></ProtectedRoute>} />
            <Route path="/simulacion/:tipo/escena/:escenaId" element={<ProtectedRoute><EscenaPage /></ProtectedRoute>} />
            <Route path="/simulacion/:tipo/resultado" element={<ProtectedRoute><ResultadoPage /></ProtectedRoute>} />
            <Route path="/guia" element={<ProtectedRoute><GuiaPage /></ProtectedRoute>} />
            <Route path="/estadisticas" element={<ProtectedRoute><EstadisticasPage /></ProtectedRoute>} />
            <Route path="/editor" element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
            <Route path="/editor/:id" element={<ProtectedRoute><EditorEscenarioPage /></ProtectedRoute>} />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </SimulacionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App