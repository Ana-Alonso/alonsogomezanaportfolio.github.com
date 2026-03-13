import React, { useRef, useEffect } from 'react';
import { useJourney } from '../../context/JourneyContext';
import type { Station as StationType } from '../../types';
import styles from './Station.module.css';
import biomeMeadow from '../../assets/fondo.png';
import biomeMountain from '../../assets/formation.png';
import biomeCity from '../../assets/skills.png';
import biomeCoast from '../../assets/contacto.png';
import profileImage from '../../assets/profile.jpg';

interface StationProps {
  station: StationType;
  /** Callback del hook useScrollDetection para registrar el elemento DOM */
  registerSection?: (el: HTMLElement | null, id: string) => void;
}

/**
 * Station
 *
 * Representa una sección/bioma del portfolio (una parada del tren).
 * Cada instancia ocupa mínimo 100vh y tiene:
 *   - Un fondo degradado según el bioma.
 *   - Una "caja de estación" con nombre, descripción y detalles.
 *   - Un botón de interacción que abre el modal RPG (RailwayCard).
 */
export const Station: React.FC<StationProps> = ({ station, registerSection }) => {
  const { openDialog, triggerPassengerAnimation } = useJourney();
  const sectionRef = useRef<HTMLElement>(null);

  const biomeImageMap = {
    meadow: biomeMeadow,
    mountain: biomeMountain,
    city: biomeCity,
    coast: biomeCoast,
  } as const;

  // Registra el elemento en el IntersectionObserver del hook padre
  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection(sectionRef.current, station.id);
    }
  }, [registerSection, station.id]);

  const handleInteract = () => {
    openDialog(station.id);
    if (station.passengerAction !== 'none') {
      triggerPassengerAnimation(station.passengerAction);
    }
  };

  return (
    <section
      id={`station-${station.id}`}
      ref={sectionRef}
      className={`${styles.section} ${styles[`biome--${station.biome}`]}`}
      aria-label={`Estación: ${station.name}`}
    >
      <img
        className={styles.biomeImage}
        src={biomeImageMap[station.biome]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      {/* Capa decorativa del bioma */}
      <div className={styles.biomeLayer} aria-hidden="true">
        <div className={styles.biomeTerrain} />
      </div>

      {/* Caja principal de la estación */}
      <div
        className={`${styles.stationBox} ${
          station.id === 'inicio' ? styles.stationBoxInicio : ''
        }`}
      >

        {/* Señal de andén */}
        <div className={styles.signalBoard}>
          <span className={styles.platformBadge}>{station.platformCode}</span>
          <div className={styles.signalInfo}>
            <h2 className={styles.stationName}>{station.name.toUpperCase()}</h2>
            <span className={styles.platformLabel}>{station.platform}</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Descripción */}
        <p className={styles.description}>{station.description}</p>

        {/* Retrato del andén de inicio */}
        {station.id === 'inicio' && (
          <div className={styles.profileWrap}>
            <img
              src={profileImage}
              alt="Retrato de Ana Alonso"
              className={styles.profileImage}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Lista de detalles (Inicio, Formación, Contacto) */}
        {station.details.length > 0 && (
          <ul className={styles.details} aria-label="Detalles">
            {station.details.map((item, i) => (
              <li key={i} className={styles.detailItem}>
                <span className={styles.detailBullet} aria-hidden="true">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Barras de skills (solo estación Skills) */}
        {station.skills && station.skills.length > 0 && (
          <div className={styles.skillsGrid} aria-label="Habilidades técnicas">
            {station.skills.map((skill) => (
              <div key={skill.name} className={styles.skillRow}>
                <span className={styles.skillName}>{skill.name}</span>
                <div
                  className={styles.skillBar}
                  role="meter"
                  aria-valuenow={skill.level}
                  aria-valuemin={1}
                  aria-valuemax={5}
                  aria-label={`${skill.name}: nivel ${skill.level} de 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.pip} ${i < skill.level ? styles.pipFull : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón de interacción → abre RailwayCard */}
        <button
          className={styles.interactBtn}
          onClick={handleInteract}
          aria-label={`Ver detalles de la estación ${station.name}`}
        >
          <span aria-hidden="true">💬</span>
          VER DETALLES
        </button>
      </div>
    </section>
  );
};
