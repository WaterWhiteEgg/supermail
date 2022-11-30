import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
  },
  {
    path: '/about',
    name: 'About',
  }
]

const router = new VueRouter({
  routes
})

export default router
