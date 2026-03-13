# /public/assets/biomes/

Carpeta para las imágenes de fondo de cada estación (bioma).

## Convención de nombres
- Formato PNG, tamaño mínimo recomendado: 1920×1080 px.
- Estilo pixel art 32-bit con paleta limitada (~64 colores).
- Usar image-rendering: pixelated en el CSS.

## Archivos esperados
| Archivo             | Estación     | Descripción del escenario                     |
|---------------------|--------------|-----------------------------------------------|
| `biome-meadow.png`  | Inicio       | Pradera verde con bosque de píxeles           |
| `biome-mountain.png`| Formación    | Montañas nevadas al atardecer                 |
| `biome-city.png`    | Skills       | Ciudad cyberpunk con rascacielos pixelados    |
| `biome-coast.png`   | Contacto     | Costa con acantilados y mar en pixel art      |

## Uso en CSS (Station.module.css)
```css
.biome--meadow {
  background-image: url('/assets/biomes/biome-meadow.png');
  background-size: cover;
  background-position: center;
  image-rendering: pixelated;
}
```

> Hasta colocar los archivos reales, las secciones usan degradados CSS temáticos.
