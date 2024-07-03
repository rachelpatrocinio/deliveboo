import { createWebHistory, createRouter } from 'vue-router'

import AppHomepage from './pages/AppHomepage.vue'


const routes = [
  { path: '/', component: AppHomepage },
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