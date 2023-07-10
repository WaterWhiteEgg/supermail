import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    needTabber: true,
    needCartPush: true,
    needStarPush: true,
    donChangeCar: true,
    donChangeStar: true,
    isAllCartListsCheck: true,
    iidStar: [],
    cartLists: [],
    popup: false,
    isRequest: true,
  },
  mutations,
  getters,
  actions,
  modules: {

  }
})
export default store
