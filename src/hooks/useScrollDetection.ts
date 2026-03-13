import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollDetection
 *
 * Observa las secciones de estación con IntersectionObserver y dispara
 * `onActiveChange(id)` cuando una sección entra en la zona central del viewport.
 *
 * Diseño: el hook no conoce el contexto; App.tsx conecta el callback
 * con `setActiveStation` y `triggerArrivalAlert`.
 *
 * @param onActiveChange  Callback con el id de la estación activa.
 * @returns               `registerSection(el, id)` para asignar a los refs.
 */
export function useScrollDetection(onActiveChange: (id: string) => void): {
  registerSection: (el: HTMLElement | null, id: string) => void;
} {
  // Lista de secciones registradas para calcular la activa por posición real.
  const sectionsRef = useRef<Array<{ id: string; el: HTMLElement }>>([]);
  const activeIdRef = useRef<string | null>(null);

  // Mantenemos el callback en una ref para no recrear listeners globales.
  const callbackRef = useRef(onActiveChange);
  useEffect(() => {
    callbackRef.current = onActiveChange;
  }, [onActiveChange]);

  const updateActiveStation = useCallback(() => {
    if (sectionsRef.current.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let bestId: string | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const section of sectionsRef.current) {
      const rect = section.el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestId = section.id;
      }
    }

    if (bestId && bestId !== activeIdRef.current) {
      activeIdRef.current = bestId;
      callbackRef.current(bestId);
    }
  }, []);

  useEffect(() => {
    let rafId = 0;
    const onViewportChange = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveStation();
      });
    };

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    // Primera evaluación al montar listeners.
    onViewportChange();

    return () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [updateActiveStation]);

  const registerSection = useCallback(
    (el: HTMLElement | null, id: string) => {
      if (!el) return;

      const list = sectionsRef.current;
      const index = list.findIndex((item) => item.id === id);

      if (index >= 0) {
        list[index] = { id, el };
      } else {
        list.push({ id, el });
      }

      updateActiveStation();
    },
    [updateActiveStation],
  );

  return { registerSection };
}
