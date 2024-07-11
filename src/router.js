import { createWebHistory, createRouter } from 'vue-router'

import AppHomepage from './pages/AppHomepage.vue'
import AppAdmin from './pages/AppAdmin.vue'
import AppMenu from './pages/AppMenu.vue'
import AppCarrello from './pages/AppCarrello.vue'
import AppPayment from './pages/AppPayment.vue'
import AppSuccess from './pages/AppSuccess.vue'
import AppNotFound from './pages/AppNotFound.vue'
import AppContact from './pages/AppContact.vue'



const routes = [
  { path: '/', name:'home', component: AppHomepage },
  { path: '/admin', component: AppAdmin },
  { path: '/menu/:slug', name: 'menu', component: AppMenu},
  { path: '/carrello', name: 'carrello', component: AppCarrello},
  { path: '/pagamento', name: 'pagamento', component: AppPayment},
  { path: '/pagamento/success', name: 'success', component: AppSuccess},
  { path: '/contatti', component: AppContact},
  { path: '/:pathMatch(.*)*', name:'not-found', component: AppNotFound},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router