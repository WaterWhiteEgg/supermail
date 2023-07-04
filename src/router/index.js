import Vue from 'vue'
import VueRouter from 'vue-router'

import { beforeEach, afterEach } from "./guards"


Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue');
const View = () => import('../views/homeview/HomeView.vue');
const Cart = () => import('../views/cart/Cart.vue');
const User = () => import('../views/user/User.vue');
const Detail = () => import('../views/detail/Detail.vue');
const Request = () => import("../views/request/Request.vue")


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return originalPush.call(this, to).catch(err => err)
}
// 取消重复路由不会报错代码


const routes = [
  {
    path: '',
    redirect: "/home",
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
  {
    path: '/user',
    component: User,
    meta: {
      requireAuth: true  // 标记该路由需要进行身份验证
    }

  },
  {
    path: '/request',
    component: Request,
  },
]

const router = new VueRouter({
  routes,
  mode: "history"
})
// 路由守卫

// 在这路由请求前触发
router.beforeEach(beforeEach)

// 路由请求之后触发
router.afterEach(afterEach)

export default router
