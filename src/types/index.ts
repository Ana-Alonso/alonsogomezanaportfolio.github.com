// ================================================================
// RAILWAY PORTFOLIO — TIPOS E INTERFACES PRINCIPALES
// Arquitectura TypeScript para la SPA con temática ferroviaria
// ================================================================

// ── Tipos literales ───────────────────────────────────────────────

/** Paisaje visual que tendrá cada sección */
export type BiomeType = "meadow" | "mountain" | "city" | "coast";

/** Código alfanumérico del panel de salidas (ej.: "A1", "B4") */
export type PlatformCode = string;

/** Estado de la animación de pasajeros en el tren */
export type PassengerAnimationState = "idle" | "boarding" | "departing";

// ── Interfaces de contenido ───────────────────────────────────────

/**
 * Enlace externo o interno dentro del contenido de una estación.
 * Usado principalmente en la estación de Contacto.
 */
export interface StationLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

/**
 * Skill/habilidad técnica representada con barra de nivel pixel art.
 * Se renderiza exclusivamente en la estación "Skills".
 */
export interface Skill {
  name: string;
  /** Nivel de dominio: 1 (básico) — 5 (experto) */
  level: 1 | 2 | 3 | 4 | 5;
  category: "frontend" | "backend" | "tools" | "other" | "design";
}

/**
 * Estructura completa de una Estación (sección del portfolio).
 * Cada estación es un "bioma" del recorrido en tren.
 */
export interface Station {
  /** Identificador único. Se usa como ID del DOM: `station-{id}` */
  id: string;

  /** Código del panel de salidas: "A1", "B2"… */
  platformCode: PlatformCode;

  /** Texto del andén: "Andén 01" */
  platform: string;

  /** Nombre legible de la estación */
  name: string;

  /** Texto para el panel de navegación: "Dest.: INICIO" */
  destinationLabel: string;

  /** Tipo de paisaje/fondo de esta sección */
  biome: BiomeType;

  /** Descripción introductoria visible en la caja de la estación */
  description: string;

  /** Lista de puntos informativos extra (pueden estar vacíos) */
  details: string[];

  /** Skills con nivel — solo estación "Skills" */
  skills?: Skill[];

  /** CTAs con enlace — solo estación "Contacto" */
  links?: StationLink[];

  /** Título que aparece en el modal RPG */
  dialogTitle: string;

  /** Texto completo revelado con efecto typewriter en el modal */
  dialogContent: string;

  /** Texto de la notificación "Nueva Parada" */
  arrivalAlert: string;

  /** Qué hace el sistema de pasajeros al interactuar con esta estación */
  passengerAction: "boarding" | "departing" | "none";
}

// ── Interfaces de estado global ───────────────────────────────────

/**
 * Estado completo del viaje en tren.
 * Gestionado mediante useReducer en JourneyContext.
 */
export interface JourneyState {
  /** ¿El usuario ha pulsado "Subir al tren" en el Ticket? */
  isJourneyStarted: boolean;

  /** ID de la estación actualmente visible en el viewport */
  activeStationId: string | null;

  /** ¿Está abierto el modal RPG? */
  isDialogOpen: boolean;

  /** ID de la estación cuyo diálogo está abierto */
  dialogStationId: string | null;

  /** ¿Debe mostrarse la notificación de nueva parada? */
  showArrivalAlert: boolean;

  /** Texto a mostrar en la notificación */
  arrivalAlertText: string;

  /** Estado actual de la animación de pasajeros */
  passengerAnimation: PassengerAnimationState;
}

/**
 * Contrato completo del contexto: estado + funciones de acción.
 * Expuesto a todos los componentes vía useJourney().
 */
export interface JourneyContextType extends JourneyState {
  startJourney: () => void;
  setActiveStation: (id: string | null) => void;
  openDialog: (stationId: string) => void;
  closeDialog: () => void;
  triggerArrivalAlert: (text: string) => void;
  dismissArrivalAlert: () => void;
  triggerPassengerAnimation: (type: "boarding" | "departing") => void;
}

// ── Acciones del reducer ──────────────────────────────────────────

/**
 * Unión discriminada de todas las acciones posibles del reducer.
 * Garantiza tipado estricto en cada dispatch.
 */
export type JourneyAction =
  | { type: "START_JOURNEY" }
  | { type: "SET_ACTIVE_STATION"; payload: string | null }
  | { type: "OPEN_DIALOG"; payload: string }
  | { type: "CLOSE_DIALOG" }
  | { type: "SHOW_ARRIVAL_ALERT"; payload: string }
  | { type: "DISMISS_ARRIVAL_ALERT" }
  | { type: "SET_PASSENGER_ANIMATION"; payload: PassengerAnimationState };
