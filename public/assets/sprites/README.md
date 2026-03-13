# /public/assets/sprites/

Carpeta para los sprites de personajes y objetos en formato PNG pixel art.

## Convención de nombres
- Deben ser PNG con fondo transparente.
- Usar image-rendering: pixelated en CSS para evitar suavizado.
- Tamaño recomendado: múltiplos de 8px (ej: 32×32, 48×64, 64×96 px).

## Archivos esperados
| Archivo               | Descripción                                  |
|-----------------------|----------------------------------------------|
| `train-loco.png`      | Locomotora (sustituye al CSS pixel art)      |
| `train-wagon.png`     | Vagón de pasajeros                           |
| `passenger-idle.png`  | Sprite pasajero en reposo (4 frames)         |
| `passenger-walk.png`  | Sprite pasajero caminando (4 frames)         |

> Hasta colocar los archivos reales, los componentes usan CSS pixel art como fallback.
