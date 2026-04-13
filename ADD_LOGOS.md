# 📸 Guía para Agregar Logos de Franquicias

## Opción 1: URLs CDN (Más rápido)

El componente soporta URLs directas. Ejemplo:

```json
{
  "id": "dunkin",
  "name": "Dunkin' Donuts",
  "shortName": "Dunkin'",
  "category": "food",
  "description": "Coffee, donuts, and breakfast franchise worldwide leader.",
  "logo": "https://logo.clearbit.com/dunkindonuts.com"
}
```

**Servicios de CDN de logos:**
- `https://logo.clearbit.com/{domain}`
- `https://logo.brandfetch.io/id/{domain}`
- `https://www.google.com/s2/favicons?sz=128&domain={domain}`

## Opción 2: Logos Locales

1. Guarda PNGs en `public/logos/` con nombre: `{id}.png`
   - Ejemplo: `public/logos/dunkin.png`
   - Tamaño recomendado: 256x256px
   - Formato: PNG con fondo transparente

2. Actualiza el JSON:
```json
{
  "logo": "/logos/dunkin.png"
}
```

## Opción 3: Híbrida (Mejor)

1. Usa CDN como fallback
2. Reemplaza con logos locales cuando estén disponibles

```json
{
  "logo": "https://logo.clearbit.com/dunkindonuts.com"
}
```

---

## 🔧 Script para Agregar Logos en Batch

```bash
# Actualizar múltiples logos vía script
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/franchises.json', 'utf8'));

data.franchises = data.franchises.map(f => ({
  ...f,
  logo: f.logo || \`https://logo.clearbit.com/\${f.id.replace(/-/g, '')}.com\`
}));

fs.writeFileSync('src/data/franchises.json', JSON.stringify(data, null, 2));
console.log('Logos actualizados');
"
```

---

## 📝 Franquicias que necesitan logos:

| ID | Nombre | Sugerencia |
|----|--------|-----------|
| dunkin | Dunkin' Donuts | dunkindonuts.com |
| great-clips | Great Clips | greatclips.com |
| aamco | AAMCO | aamco.com |
| battery-plus | Battery Plus Bulbs | batteryplus.com |
| century-21 | Century 21 | century21.com |
| choice-hotels | Choice Hotels | choicehotels.com |
| ... | ... | ... |

---

## ✅ Una vez agregados los logos:

```bash
npm run build  # Verifica que no hay errores
git add -A
git commit -m "feat: Add franchise logos"
git push
```

El componente FranchiseAvatar automáticamente:
- ✅ Mostrará el logo si existe
- ✅ Fallará al avatar si el logo no carga
- ✅ Se adapta a light/dark mode
