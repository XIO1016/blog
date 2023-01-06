export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-blog",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "xio1016 블로그" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        type: 'text/css',
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: 'katex/dist/katex.min.css',
      defer: true
    },
    "@/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuetyper.js', ssr: false},
    { src: '~/plugins/math.js', ssr: false},
    { src: '~/plugins/vue-real-wave.js', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/postcss8", "@nuxt/image",  '@nuxtjs/google-fonts'],
  vite: {
    /* options for vite */
    // ssr: true // enable unstable server-side rendering for development (false by default)
    // experimentWarning: false // hide experimental warning message (disabled by default for tests)
    vue: {
      /* options for vite-plugin-vue2 */
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "@nuxtjs/svg", "@nuxt/image",'@nuxtjs/sitemap'],
  sitemap: {
    hostname: 'https://xio1016.site',
    gzip: true,
    // exclude: [
    //   '/secret',
    //   '/admin/**'
    // ],
    routes: [
      '/blog',
      '/study',
      {
        url: '/page/3',
        changefreq: 'daily',
        priority: 1,
        lastmod: '2023-01-06T12:30:00.000Z'
      }
    ]
  },
  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
      // svg-sprite-loader options
    },
    fileLoader: {
      // file-loader options
    },
  },

  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-dracula.css",
      },
      remarkPlugins: ['remark-math', 'remark-textr'],
      rehypePlugins: ['rehype-katex']
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  googleFonts: {
    families: {
      "Playfair+Display": true,
      Inspiration: true,
      "Dancing+Script": true,
      "Open+Sans":true,
    }
  }
};
