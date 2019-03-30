const routes = [
  { path: '/', redirect: '/fr' },
  { path: '/oauth-callback', component: () => import('pages/OAuthCallback') },
  {
    path: '/:lang',
    component: () => import('layouts/MyLayout.vue'),
    beforeEnter (to, from, next) {
      const lang = to.params.lang
      if (!['fr', 'en'].includes(lang)) return next('fr')
      return next()
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'trade/scam', component: () => import('pages/ScamFactory.vue'), alias: '/trade/scam' },
      { path: 'changelog', component: () => import('pages/Changelog.vue'), alias: '/changelog' },
      { path: 'contact', component: () => import('pages/Contact.vue'), alias: '/contact' },
      { path: '*', component: () => import('pages/Error404.vue') }
    ]
  }
]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }

export default routes
