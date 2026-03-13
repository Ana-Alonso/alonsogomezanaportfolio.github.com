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
  // Referencia al observer para poder desconectarlo en cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mantenemos el callback en una ref para evitar recrear el observer
  // cada vez que cambia (p. ej. si App re-renderiza)
  const callbackRef = useRef(onActiveChange);
  useEffect(() => {
    callbackRef.current = onActiveChange;
  });

  // Inicializa el IntersectionObserver una sola vez
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Filtra las que están intersectando y elige la de mayor ratio
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;

        const best = intersecting.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
        );

        const id = (best.target as HTMLElement).dataset.stationId;
        if (id) callbackRef.current(id);
      },
      {
        // Activa solo cuando el centro de la sección está en el 40% central
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []); // Sin deps: se crea una sola vez

  /**
   * Registra un elemento DOM como sección observable.
   * Se llama desde el useEffect de cada <Station /> con su ref.
   */
  const registerSection = useCallback((el: HTMLElement | null, id: string) => {
    if (!el || !observerRef.current) return;
    el.dataset.stationId = id;
    observerRef.current.observe(el);
  }, []);

  return { registerSection };
}
