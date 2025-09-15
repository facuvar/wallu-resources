# 🌍 Sistema de Traducción Automática con OpenAI

## 🚀 Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar OpenAI API Key
```bash
# Copia el archivo de ejemplo
cp env.example .env

# Edita .env y agrega tu API key de OpenAI
OPENAI_API_KEY=tu_api_key_aqui
```

### 3. Obtener API Key de OpenAI
1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crea una nueva API key
3. Cópiala al archivo `.env`

## 📝 Flujo de Trabajo

### Crear un nuevo post:
1. **Escribe tu post en español** en `src/content/blog/mi-post.md`:
```yaml
---
title: 'Mi Post Increíble'
description: 'Descripción de mi post'
pubDate: '2025-09-15'
author: 'Tu Nombre'
tags: ['tutorial', 'wallu']
language: 'es'
heroImage: 'https://...'
---

# Mi contenido en español...
```

2. **Ejecuta la traducción automática**:
```bash
npm run translate-posts
```

3. **¡Listo!** Se crearán automáticamente:
   - `mi-post-en.md` (versión en inglés)
   - `mi-post-pt.md` (versión en portugués)

### Para desarrollo local:
```bash
npm run dev
```

### Para producción:
```bash
npm run build  # Traduce automáticamente y luego build
# O si no quieres traducir:
npm run build:no-translate
```

## 🔄 Proceso Automático

### El script detecta:
- ✅ Posts en español sin traducir
- ✅ Crea versiones en inglés y portugués
- ✅ Mantiene el formato Markdown
- ✅ Traduce título, descripción y contenido
- ✅ Conserva metadatos (fecha, autor, etc.)

### En Vercel:
1. **Push a GitHub** → triggers deploy
2. **Vercel ejecuta** `npm run build`
3. **Script traduce** posts nuevos automáticamente
4. **Deploy completo** con todas las traducciones

## 📁 Estructura de archivos resultante:
```
src/content/blog/
├── mi-post.md          # Original en español
├── mi-post-en.md       # Traducido a inglés
├── mi-post-pt.md       # Traducido a portugués
├── otro-post.md        # Otro post en español
├── otro-post-en.md     # Su traducción en inglés
└── otro-post-pt.md     # Su traducción en portugués
```

## ⚙️ Comandos disponibles:

- `npm run translate-posts` - Solo traduce posts
- `npm run dev` - Desarrollo local
- `npm run build` - Traduce + build para producción
- `npm run build:no-translate` - Build sin traducir

## 🛠️ Personalización

El script de traducción está en `scripts/translate-posts.js` y puedes:
- Cambiar el modelo de OpenAI (actualmente GPT-4)
- Ajustar los prompts de traducción
- Modificar qué campos se traducen
- Cambiar la lógica de detección de archivos

## 💡 Tips

- El script es **inteligente**: no traduce archivos que ya existen
- Usa **GPT-4** para traducciones de alta calidad
- Mantiene el **formato Markdown** y **enlaces**
- Traduce **naturalmente** manteniendo el tono técnico
