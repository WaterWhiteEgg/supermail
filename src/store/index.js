import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    needTabber: true,
    needCartPush: true,
    cartLists: [],
  },
  getters: {
  },
  mutations: {
    changeNeedTabber(state) {
      state.needTabber = !state.needTabber
    },
    shopcarData(state, payload) {

      for (let i = 0; i < state.cartLists.length; i++) {
        if (state.cartLists[i].iid == payload.iid) {
          state.needCartPush = false
        }
      }
      if (state.needCartPush) {
        state.cartLists.push(payload);


      } else {

        state.needCartPush = true
      }



    }

  },
  actions: {
  },
  modules: {
  }
})
export default store
