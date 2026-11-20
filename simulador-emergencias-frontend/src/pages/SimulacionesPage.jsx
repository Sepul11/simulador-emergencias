import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { simulaciones } from '../data/simulaciones'
import { getEscenariosCustom, transformarParaSimulador } from '../utils/escenariosCustom'
import { useSimulacion } from '../context/SimulacionContext'

export default function SimulacionesPage() {
  const navigate = useNavigate()
  const { iniciarSimulacion } = useSimulacion()
  const [custom, setCustom] = useState([])

  useEffect(() => {
    const publicados = getEscenariosCustom().filter((e) => e.estado === 'publicado' && e.primeraEscenaId)
    setCustom(publicados)
  }, [])

  const handleIniciarHardcoded = (sim) => {
    iniciarSimulacion(sim.id, sim.primeraEscena)
    navigate(`/simulacion/${sim.id}/escena/${sim.primeraEscena}`)
  }

  const handleIniciarCustom = (esc) => {
    const { sim, escenesMap } = transformarParaSimulador(esc)
    iniciarSimulacion(sim.id, sim.primeraEscena, escenesMap)
    navigate(`/simulacion/${sim.id}/escena/${sim.primeraEscena}`)
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="sim-page">
        <div className="sim-header">
          <h1 className="sim-title">Simulaciones de emergencia</h1>
          <p className="sim-subtitle">
            Elige el tipo de emergencia para preparar la actividad con tu grupo
          </p>
        </div>

        <div className="sim-cards">
          {/* Escenarios predefinidos */}
          {simulaciones.map((sim) => (
            <div
              key={sim.id}
              id={`sim-${sim.id}`}
              className="sim-card"
              style={{ '--sim-color': sim.color, '--sim-bg': sim.colorBg, '--sim-border': sim.colorBorder }}
            >
              <div className="sim-card-icon">{sim.icon}</div>
              <div className="sim-card-body">
                <h2 className="sim-card-name">{sim.nombre}</h2>
                <p className="sim-card-desc">{sim.desc}</p>
                <div className="sim-card-meta">
                  <span>⏱ {sim.duracion}</span>
                  <span>·</span>
                  <span>📍 {sim.totalEscenas} escenas</span>
                  <span>·</span>
                  <span>🔀 Rutas ramificadas</span>
                </div>
              </div>
              <button className="btn-iniciar" onClick={() => handleIniciarHardcoded(sim)}>
                Iniciar →
              </button>
            </div>
          ))}

          {/* Escenarios custom publicados */}
          {custom.map((esc) => (
            <div
              key={esc.id}
              className="sim-card sim-card-custom"
              style={{ '--sim-color': esc.color, '--sim-bg': esc.colorBg, '--sim-border': esc.colorBorder }}
            >
              <div className="sim-card-icon">{esc.icon}</div>
              <div className="sim-card-body">
                <div className="sim-card-name-row">
                  <h2 className="sim-card-name">{esc.nombre}</h2>
                  <span className="sim-custom-badge">Personalizado</span>
                </div>
                <p className="sim-card-desc">{esc.descripcion}</p>
                <div className="sim-card-meta">
                  <span>⏱ {esc.duracion}</span>
                  <span>·</span>
                  <span>📍 {esc.escenas.length} escenas</span>
                </div>
              </div>
              <button className="btn-iniciar" onClick={() => handleIniciarCustom(esc)}>
                Iniciar →
              </button>
            </div>
          ))}
        </div>

        <div className="sim-info">
          <span>ℹ️</span>
          <p>
            Cada simulación presenta escenas con situaciones reales. El facilitador marca
            la opción que el grupo acuerde. Cada decisión lleva a una escena diferente.
            {custom.length === 0 && (
              <> <a href="/editor" className="sim-info-link">Crea tus propios escenarios →</a></>
            )}
          </p>
        </div>
      </main>
    </div>
  )
}
