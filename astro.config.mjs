// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: process.env.ASTRO_SITE_URL || 'https://resources.wallu.app',
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
	// Configuración para desarrollo local con Decap CMS
	vite: {
		server: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		}
	}
});
