import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue');
const View = () => import('../views/homeview/HomeView.vue');
const Cart = () => import('../views/cart/Cart.vue');
const User = () => import('../views/user/User.vue');
const Detail = () => import('../views/detail/Detail.vue');


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return originalPush.call(this, to).catch(err => err)
}
// 取消重复路由不会报错代码
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
    path: '/homeview',
    component: View,
  },
  {
    path: '/cart',
    component: Cart,
  }, {
    path: '/detail',
    component: Detail,

  },
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
