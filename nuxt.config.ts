export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['~/assets/style/style.scss'],
  app: {
    head: {
      script: [
        {
          src: '/js/init-theme.js',
          tagPosition: 'head'
        }
      ]
    }
  }
})
