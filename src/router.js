import { createWebHistory, createRouter } from 'vue-router'

import AppHomepage from './pages/AppHomepage.vue'
import AppAdmin from './pages/AppAdmin.vue'
import AppMenu from './pages/AppMenu.vue'



const routes = [
  { path: '/', component: AppHomepage },
  { path: '/admin', component: AppAdmin },
  { path: '/menu/:slug', component: AppMenu }
//   { path: '/portfolio', component: AppPortfolio },
//   { path: '/portfolio/:slug', name: 'project.show' , component: AppProject},
//   { path: '/contact', component: AppContact },
//   { path: '/:pathMatch(.*)*', name:'not-found', component: AppNotFound},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router