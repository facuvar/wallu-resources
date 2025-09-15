export const languages = {
  es: 'Español',
  en: 'English', 
  pt: 'Português'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      blog: 'Blog', 
      about: 'Acerca de',
    },
    // Homepage
    home: {
      title: 'Creá y vendé ebooks con inteligencia artificial',
      subtitle: 'Descubrí cómo generar ingresos pasivos creando ebooks profesionales en minutos con Wallu. Sin conocimientos técnicos, solo tu creatividad y nuestra IA.',
      startFree: 'Empezar gratis',
      tutorials: 'Ver tutoriales',
      whyChoose: '¿Por qué elegir Wallu Resources?',
      features: {
        ai: {
          title: '🤖 Asistencia con IA',
          description: 'Nuestra inteligencia artificial te ayuda a escribir, estructurar y optimizar tu ebook para maximizar las ventas.'
        },
        design: {
          title: '🎨 Diseños profesionales', 
          description: 'Plantillas prediseñadas para que tu ebook luzca profesional desde el primer día.'
        },
        monetization: {
          title: '💰 Monetización integrada',
          description: 'Plataforma completa para vender y gestionar tus ebooks con herramientas de marketing incluidas.'
        }
      },
      blogPreview: {
        title: 'Últimos recursos y tutoriales',
        description: 'Aprendé paso a paso cómo crear ebooks exitosos y generar ingresos online.',
        viewAll: 'Ver todos los artículos →'
      }
    },
    // Blog
    blog: {
      backToBlog: '← Volver al blog',
      lastUpdated: 'Última actualización:'
    },
    // Footer
    footer: {
      copyright: 'Todos los derechos reservados.',
      social: {
        visit: 'Visitar Wallu',
        instagram: 'Seguir en Instagram', 
        youtube: 'Ver en YouTube'
      }
    },
    // Site info
    site: {
      title: 'Wallu Resources',
      description: 'Recursos, tutoriales y guías para crear y vender ebooks con inteligencia artificial. Aprende a generar ingresos pasivos con Wallu.'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
    },
    // Homepage  
    home: {
      title: 'Create and sell ebooks with artificial intelligence',
      subtitle: 'Discover how to generate passive income by creating professional ebooks in minutes with Wallu. No technical knowledge required, just your creativity and our AI.',
      startFree: 'Start for free',
      tutorials: 'View tutorials',
      whyChoose: 'Why choose Wallu Resources?',
      features: {
        ai: {
          title: '🤖 AI Assistance',
          description: 'Our artificial intelligence helps you write, structure and optimize your ebook to maximize sales.'
        },
        design: {
          title: '🎨 Professional designs',
          description: 'Pre-designed templates so your ebook looks professional from day one.'
        },
        monetization: {
          title: '💰 Integrated monetization', 
          description: 'Complete platform to sell and manage your ebooks with marketing tools included.'
        }
      },
      blogPreview: {
        title: 'Latest resources and tutorials',
        description: 'Learn step by step how to create successful ebooks and generate online income.',
        viewAll: 'View all articles →'
      }
    },
    // Blog
    blog: {
      backToBlog: '← Back to blog',
      lastUpdated: 'Last updated:'
    },
    // Footer
    footer: {
      copyright: 'All rights reserved.',
      social: {
        visit: 'Visit Wallu',
        instagram: 'Follow on Instagram',
        youtube: 'Watch on YouTube'
      }
    },
    // Site info
    site: {
      title: 'Wallu Resources',
      description: 'Resources, tutorials and guides for creating and selling ebooks with artificial intelligence. Learn to generate passive income with Wallu.'
    }
  },
  pt: {
    // Navigation
    nav: {
      home: 'Início',
      blog: 'Blog',
      about: 'Sobre',
    },
    // Homepage
    home: {
      title: 'Crie e venda ebooks com inteligência artificial',
      subtitle: 'Descubra como gerar renda passiva criando ebooks profissionais em minutos com Wallu. Sem conhecimento técnico, apenas sua criatividade e nossa IA.',
      startFree: 'Começar grátis',
      tutorials: 'Ver tutoriais', 
      whyChoose: 'Por que escolher Wallu Resources?',
      features: {
        ai: {
          title: '🤖 Assistência com IA',
          description: 'Nossa inteligência artificial te ajuda a escrever, estruturar e otimizar seu ebook para maximizar as vendas.'
        },
        design: {
          title: '🎨 Designs profissionais',
          description: 'Templates pré-desenhados para que seu ebook tenha aparência profissional desde o primeiro dia.'
        },
        monetization: {
          title: '💰 Monetização integrada',
          description: 'Plataforma completa para vender e gerenciar seus ebooks com ferramentas de marketing incluídas.'
        }
      },
      blogPreview: {
        title: 'Últimos recursos e tutoriais',
        description: 'Aprenda passo a passo como criar ebooks de sucesso e gerar renda online.',
        viewAll: 'Ver todos os artigos →'
      }
    },
    // Blog
    blog: {
      backToBlog: '← Voltar ao blog',
      lastUpdated: 'Última atualização:'
    },
    // Footer
    footer: {
      copyright: 'Todos os direitos reservados.',
      social: {
        visit: 'Visitar Wallu',
        instagram: 'Seguir no Instagram',
        youtube: 'Assistir no YouTube'
      }
    },
    // Site info
    site: {
      title: 'Wallu Resources',
      description: 'Recursos, tutoriais e guias para criar e vender ebooks com inteligência artificial. Aprenda a gerar renda passiva com Wallu.'
    }
  }
} as const;

export function getTranslations(lang: Language) {
  return translations[lang] || translations.es;
}

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'es';
  
  const browserLang = navigator.language.split('-')[0] as Language;
  return Object.keys(languages).includes(browserLang) ? browserLang : 'es';
}
