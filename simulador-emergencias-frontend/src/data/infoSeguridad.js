export const categorias = [
  {
    id: 'rutas-evacuacion',
    icon: '🚪',
    nombre: 'Rutas de Evacuación',
    secciones: [
      {
        titulo: 'Ruta Principal — Salida Norte',
        texto:
          'La ruta de evacuación principal conduce desde cada salón hacia el corredor norte, siguiendo las señales verdes de salida ubicadas en paredes y pisos. Tiempo estimado de evacuación total del edificio: 3 minutos.',
        puntos: [
          'Seguir las flechas verdes en paredes y pisos',
          'No usar ascensores durante la evacuación',
          'Mantener la derecha en pasillos para flujo ordenado',
          'No correr — caminar rápido y en fila',
          'El docente o facilitador lidera el grupo',
        ],
      },
      {
        titulo: 'Ruta Secundaria — Salida Sur',
        texto:
          'En caso de que la ruta norte esté bloqueada por humo o daños estructurales, se debe utilizar la salida sur ubicada al final del pasillo junto a la biblioteca.',
        puntos: [
          'Acceso por puerta de emergencia color rojo (barra antipánico)',
          'Rampa de acceso para personas con movilidad reducida',
          'Punto de reunión asignado: cancha principal',
          'Señalización luminosa activa en caso de corte de luz',
        ],
      },
      {
        titulo: 'Normas Generales de Evacuación',
        texto: 'Durante cualquier evacuación se deben respetar las siguientes normas básicas de seguridad:',
        puntos: [
          'Ayudar a personas con discapacidad o movilidad reducida',
          'Cerrar puertas al salir (sin llave) para retardar el fuego',
          'No regresar por objetos personales',
          'Alejarse del edificio mínimo 20 metros al llegar al punto de encuentro',
          'Esperar instrucciones del brigadista antes de retornar',
        ],
      },
    ],
  },
  {
    id: 'puntos-encuentro',
    icon: '📍',
    nombre: 'Puntos de Encuentro',
    secciones: [
      {
        titulo: 'Punto A — Cancha Principal (Zona Norte)',
        texto:
          'Punto de encuentro principal para estudiantes y docentes de los bloques 1, 2 y 3. Ubicado en la cancha de fútbol al norte del edificio principal. Señalizado con letrero verde y conos reflectivos.',
        puntos: [
          'Organizarse por grupos/salones al llegar',
          'El coordinador tomará lista de asistencia inmediatamente',
          'No retirarse sin autorización del brigadista líder',
          'Capacidad: hasta 500 personas',
        ],
      },
      {
        titulo: 'Punto B — Parqueadero Principal (Zona Sur)',
        texto:
          'Punto de encuentro para personal administrativo y estudiantes del bloque 4. Ubicado en el parqueadero principal, en la zona delimitada con conos naranjas.',
        puntos: [
          'Alejarse de los vehículos estacionados',
          'Esperar instrucciones del brigadista asignado al área',
          'En caso de lluvia: cobertizo lateral del parqueadero',
        ],
      },
      {
        titulo: 'Procedimiento en el Punto de Encuentro',
        texto: 'Una vez en el punto de encuentro, el facilitador debe seguir este protocolo:',
        puntos: [
          '1. Verificar que todos los integrantes del grupo estén presentes',
          '2. Reportar personas faltantes al coordinador de emergencias',
          '3. Mantener al grupo unido y en calma',
          '4. No abandonar el punto hasta recibir la señal de fin de emergencia',
          '5. Colaborar con los organismos de socorro si se requiere',
        ],
      },
    ],
  },
  {
    id: 'alarmas',
    icon: '🔔',
    nombre: 'Alarmas y Señales',
    secciones: [
      {
        titulo: 'Tipos de Señales de Alarma',
        texto:
          'El sistema de alarma del colegio cuenta con señales sonoras y visuales (luces estroboscópicas) que indican diferentes niveles de emergencia.',
        puntos: [
          '🔴 EVACUACIÓN (3 pitidos largos): Salir del edificio de inmediato por la ruta asignada',
          '🟡 ALERTA (pitidos cortos intermitentes): Mantenerse en el salón y esperar instrucciones',
          '🟢 FIN DE EMERGENCIA (1 pitido largo): Situación normalizada, se puede retornar con calma',
        ],
      },
      {
        titulo: 'Qué Hacer al Escuchar la Alarma de Evacuación',
        texto: 'Al activarse la señal de evacuación (3 pitidos largos), siga estos pasos de forma ordenada:',
        puntos: [
          '1. Dejar inmediatamente la actividad que se realiza',
          '2. Tomar solo documentos esenciales — no perder tiempo buscando objetos',
          '3. El facilitador lidera al grupo hacia la ruta de evacuación asignada',
          '4. Verificar que no queden personas en el área antes de cerrar',
          '5. Cerrar puertas sin llave al salir para contener el fuego',
          '6. Llegar ordenadamente al punto de encuentro designado',
        ],
      },
      {
        titulo: 'Ubicación de los Pulsadores de Alarma',
        texto: 'Los pulsadores manuales de alarma (color rojo) se encuentran ubicados en:',
        puntos: [
          'Bloque 1: Entrada principal, piso 1 y piso 2 — corredor central',
          'Bloque 2: Sala de profesores y junto a la biblioteca',
          'Área administrativa: Recepción y pasillo de coordinación',
          'Comedor: Entrada y junto a la cocina',
          '⚠️ Solo activar en caso de emergencia real',
        ],
      },
    ],
  },
  {
    id: 'extintores',
    icon: '🧯',
    nombre: 'Extintores',
    secciones: [
      {
        titulo: 'Ubicación de Extintores por Zona',
        texto:
          'Los extintores están ubicados estratégicamente a máximo 15 metros de cualquier punto del colegio. Se revisan y recargan mensualmente por personal certificado.',
        puntos: [
          'Bloque 1 — Piso 1: Junto a la puerta principal y sala de profesores',
          'Bloque 1 — Piso 2: Pasillo central frente al salón 201',
          'Bloque 2: Entrada principal y sala de sistemas (CO₂)',
          'Área administrativa: Recepción y sala de reuniones',
          'Comedor: Junto a la cocina (extintor tipo K — aceites)',
          'Parqueadero: Caseta de vigilancia',
        ],
      },
      {
        titulo: 'Tipos de Extintores y su Uso Correcto',
        texto:
          'Es crucial usar el tipo de extintor adecuado según el tipo de fuego. El uso incorrecto puede ser peligroso.',
        puntos: [
          '🔴 ABC — Polvo Químico Seco: Fuegos de materiales sólidos, líquidos inflamables y eléctricos. Uso general en aulas y pasillos.',
          '⚫ CO₂ — Dióxido de Carbono: Fuegos eléctricos y en equipos electrónicos. Sala de sistemas y áreas con computadores. No daña los equipos.',
          '🟠 Tipo K — Agente Húmedo: Fuegos de aceites y grasas de cocina. Exclusivo para cocina.',
        ],
      },
      {
        titulo: 'Técnica PASS para Usar el Extintor',
        texto:
          'Solo el personal capacitado y certificado debe operar extintores. Si lo es, recuerde la técnica PASS:',
        puntos: [
          'P — PULL (Jalar): Retirar el seguro (pin de seguridad)',
          'A — AIM (Apuntar): Dirigir la boquilla a la BASE del fuego, no a las llamas',
          'S — SQUEEZE (Apretar): Presionar la palanca de forma sostenida',
          'S — SWEEP (Barrer): Mover la boquilla de lado a lado cubriendo el área',
          '⚠️ Mantenerse a mínimo 2 metros del fuego y de espaldas a la salida',
        ],
      },
    ],
  },
]
