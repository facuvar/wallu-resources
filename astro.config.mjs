// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://resources.wallu.app',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en', 'pt'],
		routing: {
			prefixDefaultLocale: false
		}
	},
	// Optimizaciones para producción
	output: 'static',
	build: {
		assets: 'assets'
	},
	compressHTML: true,
	// Forzar rebuild limpio
	cacheDir: './.astro-cache-' + (process.env.CACHE_BUST || 'sitemap-fix'),
	// Configuración para desarrollo local con Decap CMS
	vite: {
		server: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		}
	}
});
