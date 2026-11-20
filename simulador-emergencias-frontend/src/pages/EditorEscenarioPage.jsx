import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  getEscenarioCustom, guardarEscenarioCustom,
  nuevoEscenario, nuevaEscena, nuevaOpcion,
} from '../utils/escenariosCustom'

const ICONOS = ['⚡','💧','🌪️','☢️','🧯','🚨','🏗️','⛽','🔋','🌡️','💥','🛑']
const COLORES = [
  { color: '#6366f1', bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.25)' },
  { color: '#e63946', bg: 'rgba(230,57,70,0.1)',    border: 'rgba(230,57,70,0.25)' },
  { color: '#f4a261', bg: 'rgba(244,162,97,0.1)',   border: 'rgba(244,162,97,0.25)' },
  { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',    border: 'rgba(34,197,94,0.25)' },
  { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',    border: 'rgba(6,182,212,0.25)' },
  { color: '#a855f7', bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.25)' },
  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.25)' },
  { color: '#ec4899', bg: 'rgba(236,72,153,0.1)',   border: 'rgba(236,72,153,0.25)' },
]

export default function EditorEscenarioPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esNuevo = id === 'nuevo'

  const [escenario, setEscenario] = useState(() => {
    if (esNuevo) return nuevoEscenario()
    return getEscenarioCustom(id) ?? nuevoEscenario()
  })
  const [escenaSelId, setEscenaSelId] = useState(null)
  const [guardado, setGuardado] = useState(false)
  const [paso, setPaso] = useState(1) // 1=info, 2=escenas

  const escenaSeleccionada = escenario.escenas.find((e) => e.id === escenaSelId) ?? null

  // ── Escenario fields ──
  const setField = (k, v) => setEscenario((prev) => ({ ...prev, [k]: v }))

  const setColor = (cfg) => setEscenario((prev) => ({
    ...prev, color: cfg.color, colorBg: cfg.bg, colorBorder: cfg.border,
  }))

  // ── Escenas CRUD ──
  const addEscena = () => {
    const e = nuevaEscena(escenario.escenas.length + 1)
    const nuevo = { ...escenario, escenas: [...escenario.escenas, e] }
    if (!nuevo.primeraEscenaId) nuevo.primeraEscenaId = e.id
    setEscenario(nuevo)
    setEscenaSelId(e.id)
  }

  const updateEscena = useCallback((id, fields) => {
    setEscenario((prev) => ({
      ...prev,
      escenas: prev.escenas.map((e) => e.id === id ? { ...e, ...fields } : e),
    }))
  }, [])

  const deleteEscena = (id) => {
    setEscenario((prev) => {
      const escenas = prev.escenas.filter((e) => e.id !== id)
      // Limpiar referencias rotas en opciones
      const limpias = escenas.map((e) => ({
        ...e,
        opciones: e.opciones.map((o) => ({
          ...o,
          siguienteEscenaId: o.siguienteEscenaId === id ? null : o.siguienteEscenaId,
        })),
      }))
      return {
        ...prev,
        escenas: limpias,
        primeraEscenaId: prev.primeraEscenaId === id ? (limpias[0]?.id ?? null) : prev.primeraEscenaId,
      }
    })
    if (escenaSelId === id) setEscenaSelId(null)
  }

  // ── Opciones CRUD ──
  const addOpcion = (escenaId) => {
    const op = nuevaOpcion()
    updateEscena(escenaId, {
      opciones: [...(escenario.escenas.find((e) => e.id === escenaId)?.opciones ?? []), op],
    })
  }

  const updateOpcion = (escenaId, opId, fields) => {
    const escena = escenario.escenas.find((e) => e.id === escenaId)
    if (!escena) return
    updateEscena(escenaId, {
      opciones: escena.opciones.map((o) => o.id === opId ? { ...o, ...fields } : o),
    })
  }

  const deleteOpcion = (escenaId, opId) => {
    const escena = escenario.escenas.find((e) => e.id === escenaId)
    if (!escena) return
    updateEscena(escenaId, { opciones: escena.opciones.filter((o) => o.id !== opId) })
  }

  // ── Guardar ──
  const guardar = (estadoTarget) => {
    const final = { ...escenario, estado: estadoTarget }
    guardarEscenarioCustom(final)
    setEscenario(final)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  const puedePublicar = escenario.nombre.trim() && escenario.escenas.length >= 1 && escenario.primeraEscenaId

  // ── Renders ──
  return (
    <div className="app-layout">
      <Navbar />
      <main className="editor-page">

        {/* Top bar */}
        <div className="editor-topbar">
          <button className="btn-editor-back" onClick={() => navigate('/editor')}>← Volver al editor</button>
          <h1 className="editor-topbar-titulo">
            {escenario.icon} {escenario.nombre || 'Nuevo escenario'}
          </h1>
          <div className="editor-topbar-acciones">
            {guardado && <span className="guardado-msg">✓ Guardado</span>}
            <button className="btn-guardar-borrador" onClick={() => guardar('borrador')}>
              Guardar borrador
            </button>
            <button
              className="btn-publicar-escenario"
              disabled={!puedePublicar}
              onClick={() => { guardar('publicado'); navigate('/editor') }}
            >
              ↑ Publicar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="editor-tabs">
          <button className={`editor-tab ${paso === 1 ? 'activo' : ''}`} onClick={() => setPaso(1)}>
            1. Información básica
          </button>
          <button className={`editor-tab ${paso === 2 ? 'activo' : ''}`} onClick={() => setPaso(2)}>
            2. Escenas y decisiones ({escenario.escenas.length})
          </button>
        </div>

        {/* ── Paso 1: Info ── */}
        {paso === 1 && (
          <div className="editor-info-step">
            <div className="editor-form-card">
              <h2 className="editor-form-titulo">Información del escenario</h2>

              <div className="form-field">
                <label>Nombre del escenario *</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Ej: Simulacro de fuga de gas"
                  value={escenario.nombre}
                  onChange={(e) => setField('nombre', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Descripción</label>
                <textarea
                  className="editor-textarea"
                  placeholder="Breve descripción de la emergencia y qué entrena este escenario..."
                  rows={3}
                  value={escenario.descripcion}
                  onChange={(e) => setField('descripcion', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Duración estimada</label>
                  <input
                    type="text"
                    className="editor-input"
                    placeholder="~15 min"
                    value={escenario.duracion}
                    onChange={(e) => setField('duracion', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Ícono</label>
                <div className="icono-picker">
                  {ICONOS.map((ic) => (
                    <button
                      key={ic}
                      className={`icono-btn ${escenario.icon === ic ? 'activo' : ''}`}
                      onClick={() => setField('icon', ic)}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label>Color de acento</label>
                <div className="color-picker">
                  {COLORES.map((cfg) => (
                    <button
                      key={cfg.color}
                      className={`color-swatch ${escenario.color === cfg.color ? 'activo' : ''}`}
                      style={{ background: cfg.color }}
                      onClick={() => setColor(cfg)}
                      title={cfg.color}
                    />
                  ))}
                </div>
              </div>

              <div className="editor-preview-mini">
                <p className="preview-label">Vista previa de tarjeta:</p>
                <div
                  className="preview-card"
                  style={{ '--sim-color': escenario.color, '--sim-bg': escenario.colorBg, '--sim-border': escenario.colorBorder }}
                >
                  <span className="preview-icon">{escenario.icon}</span>
                  <div>
                    <p className="preview-nombre">{escenario.nombre || 'Nombre del escenario'}</p>
                    <p className="preview-desc">{escenario.descripcion || 'Descripción...'}</p>
                  </div>
                </div>
              </div>

              <button className="btn-siguiente-paso" onClick={() => setPaso(2)}>
                Continuar → Agregar escenas
              </button>
            </div>
          </div>
        )}

        {/* ── Paso 2: Escenas ── */}
        {paso === 2 && (
          <div className="editor-escenas-step">

            {/* Panel izquierdo: lista de escenas */}
            <div className="escenas-sidebar">
              <div className="escenas-sidebar-header">
                <span className="escenas-sidebar-titulo">Escenas</span>
                <button className="btn-add-escena" onClick={addEscena}>+ Añadir</button>
              </div>

              {escenario.escenas.length === 0 ? (
                <div className="escenas-empty">
                  <p>No hay escenas.</p>
                  <button className="btn-add-escena-big" onClick={addEscena}>+ Primera escena</button>
                </div>
              ) : (
                <div className="escenas-nav">
                  {escenario.escenas.map((e, i) => (
                    <div
                      key={e.id}
                      className={`escena-nav-item ${escenaSelId === e.id ? 'activa' : ''} ${e.esFin ? 'es-fin' : ''}`}
                      onClick={() => setEscenaSelId(e.id)}
                    >
                      <div className="escena-nav-num">{i + 1}</div>
                      <div className="escena-nav-info">
                        <p className="escena-nav-titulo">{e.titulo || 'Sin título'}</p>
                        <p className="escena-nav-meta">
                          {e.esFin ? '🏁 Final' : `${e.opciones.length} opciones`}
                          {escenario.primeraEscenaId === e.id && ' · ★ Primera'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="escenas-sidebar-footer">
                <div className="form-field-sm">
                  <label>Primera escena:</label>
                  <select
                    className="editor-select"
                    value={escenario.primeraEscenaId ?? ''}
                    onChange={(e) => setField('primeraEscenaId', e.target.value || null)}
                  >
                    <option value="">— seleccionar —</option>
                    {escenario.escenas.map((e) => (
                      <option key={e.id} value={e.id}>{e.titulo || `Escena ${escenario.escenas.indexOf(e) + 1}`}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Panel derecho: editor de la escena seleccionada */}
            <div className="escena-editor-panel">
              {!escenaSeleccionada ? (
                <div className="escena-panel-empty">
                  <span>📋</span>
                  <p>Selecciona una escena de la lista o agrega una nueva para editarla aquí.</p>
                </div>
              ) : (
                <EscenaEditor
                  key={escenaSeleccionada.id}
                  escena={escenaSeleccionada}
                  todasEscenas={escenario.escenas}
                  onChange={(fields) => updateEscena(escenaSeleccionada.id, fields)}
                  onAddOpcion={() => addOpcion(escenaSeleccionada.id)}
                  onUpdateOpcion={(opId, fields) => updateOpcion(escenaSeleccionada.id, opId, fields)}
                  onDeleteOpcion={(opId) => deleteOpcion(escenaSeleccionada.id, opId)}
                  onDelete={() => deleteEscena(escenaSeleccionada.id)}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// ── Componente: editor de una escena ──────────────────────────────
function EscenaEditor({ escena, todasEscenas, onChange, onAddOpcion, onUpdateOpcion, onDeleteOpcion, onDelete }) {
  const otrasEscenas = todasEscenas.filter((e) => e.id !== escena.id)

  return (
    <div className="escena-editor-form">
      <div className="escena-editor-header">
        <h2 className="escena-editor-titulo">Editando escena</h2>
        <button className="btn-delete-escena" onClick={onDelete} title="Eliminar escena">🗑 Eliminar</button>
      </div>

      <div className="form-field">
        <label>Título de la escena *</label>
        <input
          className="editor-input"
          placeholder="Ej: ¡Alerta de fuga de gas!"
          value={escena.titulo}
          onChange={(e) => onChange({ titulo: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label>Descripción de la situación *</label>
        <textarea
          className="editor-textarea"
          rows={4}
          placeholder="Describe la situación de emergencia que el grupo debe enfrentar..."
          value={escena.situacion}
          onChange={(e) => onChange({ situacion: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={escena.esFin}
            onChange={(e) => onChange({ esFin: e.target.checked })}
          />
          <span>Esta es una escena final (fin del recorrido)</span>
        </label>
      </div>

      {escena.esFin ? (
        <>
          <div className="form-field">
            <label>Resultado final</label>
            <select
              className="editor-select"
              value={escena.resultadoFin ?? 'aceptable'}
              onChange={(e) => onChange({ resultadoFin: e.target.value })}
            >
              <option value="excelente">🏆 Excelente — El grupo tomó las mejores decisiones</option>
              <option value="aceptable">✅ Aceptable — Resultado seguro pero mejorable</option>
              <option value="critico">⚠️ Riesgo — Decisiones peligrosas</option>
            </select>
          </div>
          <div className="form-field">
            <label>Mensaje de aprendizaje clave</label>
            <textarea
              className="editor-textarea"
              rows={3}
              placeholder="Resume qué aprendió el grupo en esta ruta..."
              value={escena.mensajeFin ?? ''}
              onChange={(e) => onChange({ mensajeFin: e.target.value })}
            />
          </div>
        </>
      ) : (
        <>
          <div className="form-field">
            <label>Pregunta para el grupo *</label>
            <input
              className="editor-input"
              placeholder="¿Qué debe hacer el grupo?"
              value={escena.pregunta ?? ''}
              onChange={(e) => onChange({ pregunta: e.target.value })}
            />
          </div>

          <div className="form-field">
            <div className="opciones-header">
              <label>Opciones de respuesta</label>
              {escena.opciones.length < 3 && (
                <button className="btn-add-opcion" onClick={onAddOpcion}>+ Opción</button>
              )}
            </div>

            {escena.opciones.length === 0 && (
              <p className="opciones-hint">Agrega al menos una opción de respuesta.</p>
            )}

            {escena.opciones.map((op, i) => (
              <div key={op.id} className="opcion-editor-row">
                <div className="opcion-editor-num">{String.fromCharCode(65 + i)}</div>
                <div className="opcion-editor-fields">
                  <input
                    className="editor-input"
                    placeholder="Texto de la opción..."
                    value={op.texto}
                    onChange={(e) => onUpdateOpcion(op.id, { texto: e.target.value })}
                  />
                  <div className="opcion-editor-row2">
                    <select
                      className="editor-select"
                      value={op.siguienteEscenaId ?? ''}
                      onChange={(e) => onUpdateOpcion(op.id, { siguienteEscenaId: e.target.value || null })}
                    >
                      <option value="">→ Lleva a... (seleccionar)</option>
                      {otrasEscenas.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.titulo || `Escena sin título`}
                          {e.esFin ? ' 🏁' : ''}
                        </option>
                      ))}
                    </select>
                    <label className="toggle-label-sm">
                      <input
                        type="checkbox"
                        checked={op.esCorrecta}
                        onChange={(e) => onUpdateOpcion(op.id, { esCorrecta: e.target.checked })}
                      />
                      <span>Acertada</span>
                    </label>
                  </div>
                  <input
                    className="editor-input editor-input-sm"
                    placeholder="Retroalimentación (por qué es correcta o incorrecta)..."
                    value={op.feedback ?? ''}
                    onChange={(e) => onUpdateOpcion(op.id, { feedback: e.target.value })}
                  />
                </div>
                <button className="btn-delete-opcion" onClick={() => onDeleteOpcion(op.id)}>✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
