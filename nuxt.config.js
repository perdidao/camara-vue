import pt from 'vuetify/es5/locale/pt'

export default {
  target: "static",
  ssr: false,
  head: {
    titleTemplate: "%s" + process.env.npm_package_title,
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  router: {
    base: process.env.VUE_APP_ROOT_API,
  },
  env: {
    api: "https://dadosabertos.camara.leg.br/api/v2/",
  },
  loading: { color: "#06C" },
  css: [],
  plugins: [],
  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
  ],
  modules: [
    "@nuxtjs/axios",
  ],
  axios: {},
  vuetify: {
    lang: {
      locales: { pt },
      current: 'pt',
    },
    theme: {
      dark: false,
    },
  },
  build: {
    extend(config, ctx) {},
  },
};
