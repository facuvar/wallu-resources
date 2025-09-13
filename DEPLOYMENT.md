# Guía Rápida de Deployment en Vercel

## 📋 Pasos para desplegar en resources.wallu.app

### 1. Preparar el repositorio GitHub

1. **Crear repositorio en GitHub** (si no existe):
```bash
git init
git add .
git commit -m "Initial commit: Blog con Astro + Decap CMS"
git branch -M main
git remote add origin https://github.com/facuvar/wallu-resources.git
git push -u origin main
```

2. **Configuración del repositorio**:
   - ✅ Ya configurado para `facuvar/wallu-resources`
   - El repositorio ya está configurado correctamente

### 2. Configurar GitHub OAuth App

1. Ve a [GitHub Developer Settings](https://github.com/settings/developers)
2. Click en "New OAuth App"
3. Completa el formulario:
   - **Application name**: `Wallu Resources Blog`
   - **Homepage URL**: `https://resources.wallu.app`
   - **Authorization callback URL**: `https://resources.wallu.app/api/auth`
4. Guarda el **Client ID** y **Client Secret**

### 3. Desplegar en Vercel

1. **Conectar repositorio**:
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Click en "New Project"
   - Importa tu repositorio de GitHub

2. **Configurar variables de entorno**:
   En el dashboard de Vercel, añade estas variables:
   ```
   ASTRO_SITE_URL=https://resources.wallu.app
   GITHUB_CLIENT_ID=tu_client_id_de_github
   GITHUB_CLIENT_SECRET=tu_client_secret_de_github
   ```

3. **Configurar dominio personalizado**:
   - En Project Settings > Domains
   - Añade `resources.wallu.app`
   - Configura los registros DNS según las instrucciones de Vercel

### 4. Verificar funcionamiento

1. **Sitio público**: `https://resources.wallu.app`
2. **Panel de administración**: `https://resources.wallu.app/admin`
3. **Autenticación**: Se hará através de GitHub

### 5. Gestión de contenido

- **En desarrollo**: Usa `npm run dev` + `npm run cms` y ve a `/admin`
- **En producción**: Ve a `/admin` y autentica con GitHub
- Los cambios se commitean automáticamente al repositorio

## 🔧 Comandos útiles

```bash
# Desarrollo local
npm run dev        # Servidor Astro
npm run cms        # Backend CMS local (en otra terminal)

# Build y preview
npm run build      # Construir para producción
npm run preview    # Preview del build local

# Deploy
git push           # Vercel se encarga del resto automáticamente
```

## 🚨 Notas importantes

- **Seguridad**: Nunca commitees las claves secretas al repositorio
- **Permisos**: El usuario de GitHub debe tener permisos de escritura en el repo
- **Cache**: Vercel puede tardar unos minutos en actualizar después de un push
- **Imágenes**: Se almacenan en `/public/images/uploads/` y se commitean al repo
