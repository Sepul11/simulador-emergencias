import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  getEscenariosCustom, eliminarEscenarioCustom, guardarEscenarioCustom,
} from '../utils/escenariosCustom'

export default function EditorPage() {
  const navigate = useNavigate()
  const [escenarios, setEscenarios] = useState([])

  useEffect(() => { setEscenarios(getEscenariosCustom()) }, [])

  const handleEliminar = (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
    setEscenarios(eliminarEscenarioCustom(id))
  }

  const handleToggleEstado = (escenario) => {
    const nuevo = {
      ...escenario,
      estado: escenario.estado === 'publicado' ? 'borrador' : 'publicado',
    }
    setEscenarios(guardarEscenarioCustom(nuevo))
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="editor-list-page">

        <div className="editor-list-header">
          <div>
            <h1 className="editor-list-titulo">Editor de escenarios</h1>
            <p className="editor-list-subtitulo">
              Crea y administra tus propios simulacros sin necesidad de programar.
            </p>
          </div>
          <button className="btn-nuevo-escenario" onClick={() => navigate('/editor/nuevo')}>
            + Nuevo escenario
          </button>
        </div>

        {/* Info de integración */}
        <div className="editor-info">
          <span>💡</span>
          <p>
            Los escenarios <strong>publicados</strong> aparecen automáticamente en la página de Simulaciones junto con
            los escenarios de Sismo e Incendio.
          </p>
        </div>

        {escenarios.length === 0 ? (
          <div className="editor-empty">
            <span>🏗️</span>
            <h2>No hay escenarios personalizados</h2>
            <p>Crea tu primer escenario de emergencia personalizado para tu empresa.</p>
            <button className="btn-nuevo-escenario" onClick={() => navigate('/editor/nuevo')}>
              + Crear primer escenario
            </button>
          </div>
        ) : (
          <div className="editor-cards">
            {escenarios.map((esc) => (
              <div key={esc.id} className="editor-card">
                <div className="editor-card-left">
                  <div className="editor-card-icon" style={{ background: esc.colorBg, borderColor: esc.colorBorder }}>
                    {esc.icon}
                  </div>
                </div>
                <div className="editor-card-body">
                  <div className="editor-card-row">
                    <h3 className="editor-card-nombre">{esc.nombre || 'Sin nombre'}</h3>
                    <span className={`editor-estado-badge ${esc.estado}`}>
                      {esc.estado === 'publicado' ? '✓ Publicado' : '✎ Borrador'}
                    </span>
                  </div>
                  <p className="editor-card-desc">{esc.descripcion || 'Sin descripción'}</p>
                  <div className="editor-card-meta">
                    <span>📋 {esc.escenas?.length ?? 0} escenas</span>
                    <span>·</span>
                    <span>⏱ {esc.duracion}</span>
                    {esc.primeraEscenaId && <span>· ✓ Primera escena configurada</span>}
                  </div>
                </div>
                <div className="editor-card-acciones">
                  <button
                    className="btn-editor-accion btn-editar"
                    onClick={() => navigate(`/editor/${esc.id}`)}
                  >
                    ✎ Editar
                  </button>
                  <button
                    className={`btn-editor-accion ${esc.estado === 'publicado' ? 'btn-despublicar' : 'btn-publicar'}`}
                    onClick={() => handleToggleEstado(esc)}
                  >
                    {esc.estado === 'publicado' ? '↓ Ocultar' : '↑ Publicar'}
                  </button>
                  <button
                    className="btn-editor-accion btn-eliminar"
                    onClick={() => handleEliminar(esc.id, esc.nombre)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
