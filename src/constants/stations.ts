// ================================================================
// RAILWAY PORTFOLIO — CONSTANTES DE ESTACIONES
// Las 4 paradas del trayecto: Inicio · Formación · Skills · Contacto
// ================================================================

import type { Station } from "../types";

/**
 * Array principal de estaciones.
 * El orden determina la secuencia de scroll vertical del portfolio.
 * Cada entrada respeta la interfaz `Station` definida en src/types/index.ts
 */
export const STATIONS: Station[] = [
  // ── ESTACIÓN 1 · INICIO ──────────────────────────────────────
  {
    id: "inicio",
    platformCode: "A1",
    platform: "Andén 01",
    name: "Inicio",
    destinationLabel: "Dest.: INICIO",
    biome: "meadow",
    description:
      "Desarrolladora Frontend con pasión por interfaces accesibles, experiencias pixel-perfectas y sistemas de diseño escalables.",
    details: [
      "Basada en Miranda de Ebro, España",
      "Disponible para proyectos freelance",
      "Abierta a oportunidades full-time",
    ],
    dialogTitle: "[ EST. INICIO — Andén A1 ]",
    dialogContent:
      "Bienvenido/a a bordo. Soy Ana Alonso, desarrolladora frontend especializada en React y TypeScript. Este portfolio es tu billete de primera clase hacia mi trabajo. Cada estación revela una parada de mi trayecto profesional. ¿Listo para el viaje?",
    arrivalAlert: "▶  NUEVA PARADA: INICIO  [A1]",
    passengerAction: "boarding",
  },

  // ── ESTACIÓN 2 · FORMACIÓN ───────────────────────────────────
  {
    id: "formacion",
    platformCode: "B2",
    platform: "Andén 02",
    name: "Formación",
    destinationLabel: "Dest.: FORMACIÓN",
    biome: "mountain",
    description:
      "Mi trayecto académico y formativo. Cada certificación es un sello en el pasaporte profesional de este viaje.",
    details: ["Grado en Ingeniería Informática — UPNA, 2021"],
    dialogTitle: "[ EST. FORMACIÓN — Andén B2 ]",
    dialogContent:
      "La formación nunca termina: cada proyecto es una lección, cada bug resuelto una nueva habilidad desbloqueada. He recorrido desde las matemáticas de la ingeniería hasta los píxeles del diseño de interfaz. Y el tren sigue en marcha.",
    arrivalAlert: "▶  NUEVA PARADA: FORMACIÓN  [B2]",
    passengerAction: "boarding",
  },

  // ── ESTACIÓN 3 · SKILLS ──────────────────────────────────────
  {
    id: "skills",
    platformCode: "C3",
    platform: "Andén 03",
    name: "Skills",
    destinationLabel: "Dest.: SKILLS",
    biome: "city",
    description:
      "El inventario de herramientas acumuladas en el viaje. Tecnologías, frameworks y metodologías dominadas.",
    details: [],
    skills: [
      { name: "React / Next.js", level: 5, category: "frontend" },
      { name: "TypeScript", level: 5, category: "frontend" },
      { name: "CSS / Tailwind", level: 4, category: "frontend" },
      { name: "HTML", level: 5, category: "frontend" },
      { name: "JavaScript", level: 5, category: "frontend" },
      { name: "Node.js", level: 3, category: "backend" },
      { name: "Python", level: 4, category: "backend" },
      { name: "PostgreSQL", level: 3, category: "backend" },
      { name: "PHP", level: 4, category: "backend" },
      { name: "MySQL", level: 3, category: "backend" },
      { name: "REST APIs", level: 4, category: "backend" },
      { name: "Git / GitHub", level: 5, category: "tools" },
      { name: "Docker", level: 3, category: "tools" },
      { name: "Adobe Ilustrator", level: 2, category: "design" },
      { name: "Adobe Premiere", level: 2, category: "design" },
    ],
    dialogTitle: "[ EST. SKILLS — Andén C3 ]",
    dialogContent:
      "El inventario de un buen desarrollador nunca está completo. Estas son mis armas favoritas para enfrentarme a cualquier proyecto. Las barras muestran nivel de dominio: 5 pips = maestría. El aprendizaje continuo es el combustible del tren.",
    arrivalAlert: "▶  NUEVA PARADA: SKILLS  [C3]",
    passengerAction: "none",
  },

  // ── ESTACIÓN 4 · CONTACTO ────────────────────────────────────
  {
    id: "contacto",
    platformCode: "D4",
    platform: "Andén 04",
    name: "Contacto",
    destinationLabel: "Dest.: CONTACTO",
    biome: "coast",
    description:
      "Estación terminal. El mejor viaje es el que se hace acompañado. Si tienes un proyecto interesante, este es el andén correcto.",
    details: [
      "alonsogomezana@gmail.com",
      "linkedin.com/in/ana-alonso-gomez",
      "github.com/Ana-Alonso",
    ],
    links: [
      {
        label: "✉  Email",
        url: "mailto:alonsogomezana@gmail.com",
        isExternal: false,
      },
      {
        label: "◈  LinkedIn",
        url: "https://linkedin.com/in/ana-alonso-gomez",
        isExternal: true,
      },
      {
        label: "◆  GitHub",
        url: "https://github.com/Ana-Alonso",
        isExternal: true,
      },
    ],
    dialogTitle: "[ EST. CONTACTO — Andén D4 ]",
    dialogContent:
      "¡Fin del trayecto! Pero el viaje puede continuar... Si tienes un proyecto interesante, una idea ambiciosa o simplemente quieres charlar sobre tecnología y diseño, escríbeme. Siempre hay asientos disponibles en el próximo tren.",
    arrivalAlert: "▶  NUEVA PARADA: CONTACTO  [D4]",
    passengerAction: "departing",
  },
];

/** Array de IDs de estación para iteraciones rápidas */
export const STATION_IDS = STATIONS.map((s) => s.id) as string[];

/** Mapa id → Station para accesos O(1) */
export const STATIONS_MAP = new Map(STATIONS.map((s) => [s.id, s]));
