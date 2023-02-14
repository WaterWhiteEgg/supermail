import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    needTabber: true,
    needCartPush: true,
    cartLists: [],
    popup: false,
  },
  getters: {
  },
  mutations: {
    changeNeedTabber(state) {
      state.needTabber = !state.needTabber
    },
    noRepeatShopcar(state, payload) {

      for (let i = 0; i < state.cartLists.length; i++) {
        if (state.cartLists || state.cartLists[i].iid == payload.iid) {
          state.needCartPush = false
        }
      }
    },
    pushShopcarData(state, payload) {
      if (state.needCartPush) {
        state.cartLists.push(payload);
      } else {
        state.needCartPush = true;
      }

    },
    openPopup(state, payload) {
      state.popup = true
    },
    closePopup(state, payload) {
      state.popup = false
    }

  },
  actions: {

    shopcarData(context, payload) {
      context.commit("noRepeatShopcar", payload)
      context.commit("pushShopcarData", payload)

    }
  },
  modules: {

  }
})
export default store
