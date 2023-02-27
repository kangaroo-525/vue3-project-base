import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { basicRoutes as routes } from './routes'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}
