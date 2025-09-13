# Blog Wallu Resources

Un blog moderno creado con **Astro** y **Decap CMS** que funciona tanto en desarrollo local como en producción.

## 🚀 Características

- ⚡ **Astro**: Framework moderno y rápido
- 📝 **Decap CMS**: Sistema de gestión de contenido fácil de usar
- 🎨 **Diseño responsivo**: Se ve genial en todos los dispositivos
- 🔍 **SEO optimizado**: Meta tags y sitemap automático
- 📱 **PWA ready**: Preparado para ser una Progressive Web App

## 🛠️ Desarrollo Local

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd wallu-resources
```

2. Instala las dependencias:
```bash
npm install
```

### Ejecutar en desarrollo

1. **Servidor de desarrollo de Astro**:
```bash
npm run dev
```
El sitio estará disponible en `http://localhost:4321`

2. **Backend local de Decap CMS** (en otra terminal):
```bash
npm run cms
```

3. **Acceder al panel de administración**:
Ve a `http://localhost:4321/admin` para gestionar el contenido.

## 📝 Gestión de Contenido

### Para Desarrolladores

Los posts del blog se almacenan en `src/content/blog/` como archivos Markdown con frontmatter YAML.

Ejemplo de estructura de un post:
```markdown
---
title: "Título del post"
description: "Descripción breve"
pubDate: 2024-09-13T10:00:00.000Z
updatedDate: 2024-09-13T10:00:00.000Z
heroImage: "/images/uploads/mi-imagen.jpg"
---

# Contenido del post

Tu contenido en Markdown aquí...
```

### Para Editores

1. Ve a `/admin` en tu navegador
2. En desarrollo local, podrás acceder directamente
3. En producción, necesitarás autenticarte con GitHub
4. Usa la interfaz visual para crear y editar posts

## 🚀 Despliegue en Producción con Vercel

### Configuración para resources.wallu.app

1. **Variables de entorno necesarias en Vercel**:
```bash
ASTRO_SITE_URL=https://resources.wallu.app
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
```

2. **Configuración de GitHub OAuth App**:
   - Ve a GitHub > Settings > Developer settings > OAuth Apps
   - Crea una nueva OAuth App con:
     - Application name: "Wallu Resources Blog"
     - Homepage URL: `https://resources.wallu.app`
     - Authorization callback URL: `https://resources.wallu.app/api/auth`

3. **Despliegue en Vercel**:
   - Conecta tu repositorio GitHub a Vercel
   - Vercel detectará automáticamente que es un proyecto Astro
   - Configura las variables de entorno en el dashboard de Vercel
   - El sitio se desplegará automáticamente

4. **Configuración del repositorio**:
   - ✅ Ya configurado para `facuvar/wallu-resources`
   - El repositorio está en: https://github.com/facuvar/wallu-resources.git

## 📁 Estructura del Proyecto

```
/
├── public/
│   ├── admin/           # Interfaz de Decap CMS
│   │   ├── config.yml   # Configuración del CMS
│   │   └── index.html   # Página del admin
│   └── images/
│       └── uploads/     # Imágenes subidas por el CMS
├── src/
│   ├── components/      # Componentes de Astro
│   ├── config/          # Configuración del sitio
│   ├── content/
│   │   └── blog/        # Posts del blog (Markdown)
│   ├── layouts/         # Layouts de Astro
│   ├── pages/           # Páginas del sitio
│   └── styles/          # Estilos CSS
├── astro.config.mjs     # Configuración de Astro
└── package.json
```

## 🎨 Personalización

### Configuración del Sitio

Edita `src/config/site.json` para cambiar:
- Título del sitio
- Descripción
- URL de producción
- Email de contacto
- Redes sociales

### Estilos

Los estilos están en `src/styles/global.css`. Puedes personalizar:
- Colores
- Tipografías
- Espaciado
- Componentes

### Configuración del CMS

Edita `public/admin/config.yml` para:
- Añadir nuevas colecciones
- Modificar campos de los posts
- Configurar widgets personalizados

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo de Astro
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run cms` - Backend local de Decap CMS

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Decap CMS](https://decapcms.org/docs/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.