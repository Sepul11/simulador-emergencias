const KEY = 'sim_historial'

export function getHistorial() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

export function guardarEnHistorial(sesion, decisionesDetalladas) {
  const correctas = decisionesDetalladas.filter((d) => d.esCorrecta).length
  const entrada = {
    id: crypto.randomUUID(),
    tipo: sesion.tipo,
    resultado: sesion.resultadoFinal,
    totalDecisiones: decisionesDetalladas.length,
    decisiones: decisionesDetalladas,
    correctas,
    fecha: new Date().toISOString(),
  }
  const actual = getHistorial()
  const actualizado = [entrada, ...actual].slice(0, 100) // last 100 sessions
  localStorage.setItem(KEY, JSON.stringify(actualizado))
  return actualizado
}

export function limpiarHistorial() {
  localStorage.removeItem(KEY)
}
