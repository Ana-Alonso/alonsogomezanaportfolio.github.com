import React, { useCallback, useEffect } from 'react';
import { useJourney } from '../../context/JourneyContext';
import { useTypewriter } from '../../hooks/useTypewriter';
import { STATIONS_MAP } from '../../constants/stations';
import styles from './RailwayCard.module.css';

/**
 * RailwayCard
 *
 * Modal estilo diálogo RPG / hoja de ruta ferroviaria.
 * Se monta globalmente en App.tsx y se controla mediante el contexto.
 *
 * Características:
 *  - Texto revelado carácter a carácter (useTypewriter).
 *  - Cierra con Escape, clic en backdrop o botón "Continuar".
 *  - Muestra links de la estación cuando el texto termina de aparecer.
 *  - Trampa de foco: el div recibe focus automáticamente al abrirse.
 */
export const RailwayCard: React.FC = () => {
  const { isDialogOpen, dialogStationId, closeDialog } = useJourney();

  const station = dialogStationId ? STATIONS_MAP.get(dialogStationId) : undefined;

  const { displayedText, isComplete } = useTypewriter(
    station?.dialogContent ?? '',
    isDialogOpen
  );

  // Trampa de foco: llevar el foco al diálogo al abrirse
  useEffect(() => {
    if (isDialogOpen) {
      const el = document.getElementById('railway-card-dialog');
      el?.focus();
    }
  }, [isDialogOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeDialog();
    },
    [closeDialog]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog();
    },
    [closeDialog]
  );

  if (!isDialogOpen || !station) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      aria-hidden={!isDialogOpen}
    >
      <div
        id="railway-card-dialog"
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-body"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {/* ── Cabecera ── */}
        <header className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {station.dialogTitle}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={closeDialog}
            aria-label="Cerrar diálogo"
          >
            ✕
          </button>
        </header>

        {/* ── Decoración: línea de ruta ── */}
        <div className={styles.routeBar} aria-hidden="true">
          <span className={styles.routeCode}>{station.platformCode}</span>
          <div className={styles.routeLine} />
          <span className={styles.routeArrow}>▶▶</span>
        </div>

        {/* ── Texto typewriter ── */}
        <div id="dialog-body" className={styles.textArea}>
          <p className={styles.dialogText} aria-live="polite">
            {displayedText}
            {!isComplete && (
              <span className={styles.cursor} aria-hidden="true">▌</span>
            )}
          </p>
        </div>

        {/* ── Links (visibles solo cuando el texto termina) ── */}
        {isComplete && station.links && station.links.length > 0 && (
          <div className={styles.links} aria-label="Contacto">
            {station.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className={styles.link}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* ── Footer con CTA ── */}
        <footer className={styles.footer}>
          {isComplete ? (
            <button className={styles.continueBtn} onClick={closeDialog}>
              [ CONTINUAR → ]
            </button>
          ) : (
            <span className={styles.footerHint} aria-live="polite">
              ESC para cerrar
            </span>
          )}
        </footer>
      </div>
    </div>
  );
};
