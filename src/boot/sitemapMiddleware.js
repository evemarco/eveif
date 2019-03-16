// import something here
import VueRouterSitemap from 'vue-router-sitemap'
import path from 'path'
import { router } from 'router'

// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  // something to do
  // app.get('/sitemap.xml', sitemapMiddleware())
}

export const sitemapMiddleware = () => {
  return (req, res) => {
    res.set('Content-Type', 'application/xml')

    const staticSitemap = path.resolve('dist/static', 'sitemap.xml')
    const filterConfig = {
      isValid: false,
      rules: [
        /\/fr/,
        /\*/
      ]
    }

    new VueRouterSitemap(router).filterPaths(filterConfig).build('https://eveif.fr').save(staticSitemap)

    return res.sendFile(staticSitemap)
  }
}

// app.get('/sitemap.xml', sitemapMiddleware())
