import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue');
const View = () => import('../views/view/View.vue');
const Cart = () => import('../views/cart/Cart.vue');
const User = () => import('../views/user/User.vue');

const routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/view',
    component: View,
  },
  {
    path: '/cart',
    component: Cart,
  }, {
    path: '/user',
    component: User,
  },
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
