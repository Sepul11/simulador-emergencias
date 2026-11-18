const KEY = 'escenarios_custom_v1'

export function getEscenariosCustom() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

export function getEscenarioCustom(id) {
  return getEscenariosCustom().find((e) => e.id === id) ?? null
}

export function guardarEscenarioCustom(escenario) {
  const todos = getEscenariosCustom()
  const idx = todos.findIndex((e) => e.id === escenario.id)
  const actualizado = idx >= 0
    ? todos.map((e, i) => (i === idx ? escenario : e))
    : [...todos, escenario]
  localStorage.setItem(KEY, JSON.stringify(actualizado))
  return actualizado
}

export function eliminarEscenarioCustom(id) {
  const actualizado = getEscenariosCustom().filter((e) => e.id !== id)
  localStorage.setItem(KEY, JSON.stringify(actualizado))
  return actualizado
}

export function nuevoEscenario() {
  return {
    id: crypto.randomUUID(),
    nombre: '',
    icon: '⚡',
    color: '#6366f1',
    colorBg: 'rgba(99,102,241,0.1)',
    colorBorder: 'rgba(99,102,241,0.25)',
    descripcion: '',
    duracion: '~15 min',
    estado: 'borrador',
    primeraEscenaId: null,
    escenas: [],
    creadoEn: new Date().toISOString(),
  }
}

export function nuevaEscena(paso = 1) {
  return {
    id: crypto.randomUUID(),
    titulo: '',
    situacion: '',
    pregunta: '',
    paso,
    esFin: false,
    resultadoFin: 'aceptable',
    mensajeFin: '',
    opciones: [],
  }
}

export function nuevaOpcion() {
  return {
    id: crypto.randomUUID(),
    texto: '',
    siguienteEscenaId: null,
    esCorrecta: true,
    feedback: '',
  }
}

// Convierte el escenario custom al formato que espera EscenaPage / SimulacionContext
export function transformarParaSimulador(escenario) {
  const sim = {
    id: escenario.id,
    nombre: escenario.nombre,
    icon: escenario.icon,
    color: escenario.color,
    colorBg: escenario.colorBg,
    colorBorder: escenario.colorBorder,
    desc: escenario.descripcion,
    duracion: escenario.duracion,
    totalEscenas: escenario.escenas.length,
    primeraEscena: escenario.primeraEscenaId,
    esCustom: true,
  }

  const escenesMap = {}
  escenario.escenas.forEach((e) => {
    escenesMap[e.id] = {
      id: e.id,
      tipo: escenario.id,
      paso: e.paso,
      titulo: e.titulo,
      situacion: e.situacion,
      pregunta: e.pregunta,
      fin: e.esFin,
      resultado: e.resultadoFin,
      mensaje: e.mensajeFin,
      opciones: e.opciones.map((o) => ({
        id: o.id,
        texto: o.texto,
        siguiente: o.siguienteEscenaId,
        esCorrecta: o.esCorrecta,
        feedback: o.feedback,
      })),
    }
  })

  return { sim, escenesMap }
}
