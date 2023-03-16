import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload,{
loading:require('./assets/img/whiting.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
