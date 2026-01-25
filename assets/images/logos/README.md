# Instrucciones para agregar logos de equipos NBA

## Ubicación de las imágenes

Coloca los logos de los equipos NBA en la siguiente carpeta:
```
assets/images/logos/
```

## Nombres de archivos requeridos

Los archivos deben tener exactamente estos nombres (en minúsculas):

1. `lakers.png` - Logo de Los Angeles Lakers
2. `celtics.png` - Logo de Boston Celtics
3. `bulls.png` - Logo de Chicago Bulls
4. `heat.png` - Logo de Miami Heat
5. `knicks.png` - Logo de New York Knicks
6. `spurs.png` - Logo de San Antonio Spurs

## Formato de imágenes

- **Formato recomendado**: PNG (con fondo transparente)
- **Tamaño recomendado**: 200x200 píxeles o más
- **Resolución**: Mínimo 72 DPI

## Dónde obtener los logos

Puedes descargar los logos oficiales de los equipos NBA desde:
- Sitio oficial de la NBA
- [NBA.com/logos](https://www.nba.com/logos)
- O cualquier fuente que tenga los logos oficiales

## Nota importante

Después de agregar las imágenes, reinicia el servidor de Expo:
```bash
npm start
```

Si las imágenes no aparecen, verifica que:
1. Los nombres de archivo coincidan exactamente con los nombres requeridos
2. Los archivos estén en formato PNG
3. La ruta en `nbaData.js` sea correcta
