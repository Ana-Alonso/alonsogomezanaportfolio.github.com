import React from 'react';
import { useJourney } from '../../context/JourneyContext';
import styles from './Ticket.module.css';

/**
 * Ticket
 *
 * Pantalla de bienvenida con diseño de billete de tren físico.
 * Ocupa toda la pantalla. Al pulsar el botón llama a startJourney(),
 * que actualiza el contexto y muestra la experiencia principal.
 */
export const Ticket: React.FC = () => {
  const { startJourney } = useJourney();

  return (
    <div className={styles.overlay} role="main">
      {/* Fondo: patrón de vías decorativo */}
      <div className={styles.tracksBg} aria-hidden="true" />

      <article
        className={styles.ticket}
        aria-label="Billete de bienvenida al portfolio"
      >
        {/* ── Cabecera del billete ── */}
        <header className={styles.header}>
          <span className={styles.logo} aria-hidden="true">🚂</span>
          <div className={styles.headerText}>
            <span className={styles.company}>RAILWAY PORTFOLIO LINE</span>
            <span className={styles.tagline}>Servicio expreso · Clase Frontend</span>
          </div>
        </header>

        {/* ── Línea perforada superior ── */}
        <div className={styles.perforation} aria-hidden="true" />

        {/* ── Cuerpo del billete ── */}
        <section className={styles.body}>
          <div className={styles.row}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>PASAJERO</span>
              <span className={styles.fieldValue}>ANA ALONSO</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>CLASE</span>
              <span className={styles.fieldValue}>FRONTEND</span>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>ORIGEN</span>
              <span className={styles.fieldValue}>MIRANDA DE EBRO</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>DESTINO</span>
              <span className={styles.fieldValue}>PORTFOLIO</span>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>FECHA</span>
              <span className={styles.fieldValue}>2026</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>ASIENTO</span>
              <span className={styles.fieldValue}>23 — A</span>
            </div>
          </div>
        </section>

        {/* ── Línea perforada inferior (separación del talón) ── */}
        <div className={styles.perforation} aria-hidden="true" />

        {/* ── Talón inferior: CTA de embarque ── */}
        <footer className={styles.stub}>
          <p className={styles.stubHint} aria-live="polite">
            ▼ PULSA PARA INICIAR EL VIAJE ▼
          </p>

          <button
            className={styles.boardButton}
            onClick={startJourney}
            aria-label="Iniciar el viaje por el portfolio de Ana Alonso"
          >
            ⬛ SUBIR AL TREN ⬛
          </button>

          {/* "Código de barras" decorativo */}
          <div className={styles.barcode} aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={styles.barcodeBar}
                style={{
                  height: `${i % 3 === 0 ? 100 : i % 2 === 0 ? 70 : 55}%`,
                  width:  `${i % 3 === 0 ? 4 : 2}px`,
                }}
              />
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
};
