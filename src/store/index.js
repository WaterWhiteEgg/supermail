import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    needTabber: true,
    needCartPush: true,
    needStarPush: true,
    donChangeCar: true,
    donChangeStar: true,
    iidStar: [],
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

      if (payload == undefined) {
        state.needCartPush = false
        return 0
      }
      // console.log(state.cartLists);

      for (let i = 0; i <= state.cartLists.length; i++) {
        if (state.cartLists.length != 0 && state.cartLists &&
          state.cartLists[i] &&
          state.cartLists[i].iid ==
          payload.iid) {
          state.needCartPush = false
          return 0
        }
      }
    },
    pushShopcarData(state, payload) {

      if (state.needCartPush) {
        state.cartLists.push(payload);
        // console.log(state.cartLists);

      } else {
        state.needCartPush = true;
      }

    },
    delShopcar(state, payload) {
      for (let i = 0; i <= state.cartLists.length; i++) {

        if (state.cartLists && state.cartLists[i] && payload == state.cartLists[i].iid) {
          state.cartLists.splice(i, 1);
          return 0

        }
      }
    },
    openPopup(state) {
      state.popup = true
    },
    closePopup(state) {
      state.popup = false
    },

    needChangeShopcar(state, payload) {
      // console.log(state.cartLists &&
      //   state.cartLists[0] &&
      //   state.cartLists[0].iid);
      if (state.cartLists.length == 0) {
        state.donChangeCar = true
        return 0
      }
      for (let i = 0; i <= state.cartLists.length; i++) {

        if (state.cartLists && state.cartLists[i] && payload == state.cartLists[i].iid) {
          state.donChangeCar = false
          // console.log(1);
          return 0
        } else {
          // console.log(2);
          state.donChangeCar = true

        }
      }
    },
    noRepeatStar(state, payload) {
      for (let i = 0; i <= state.iidStar.length; i++) {
        // console.log(!(state.iidStar.length == 0 || state.iidStar[i] != payload));
        if (!(state.iidStar.length == 0 || state.iidStar[i] != payload)) {
          state.needStarPush = false
        }
      }
    },
    pushStar(state, payload) {
      // console.log(state.iidStar);
      if (state.needStarPush) {
        state.iidStar.push(payload)
      } else {
        state.needCartPush = true
      }
    },
    needChangeStar(state, payload) {
      if (state.iidStar.length == 0) {
        state.donChangeStar = true
        return 0
      }
      for (let i = 0; i < state.iidStar.length; i++) {
        if (state.iidStar[i] == payload) {
          state.donChangeStar = false
        } else {
          state.donChangeStar = true
        }
      }

    },
    delStar(state, payload) {
      for (let i = 0; i < state.iidStar.length; i++) {
        if (state.iidStar[i] == payload) {
          state.iidStar.splice(i, 1);
          return 0

        }
      }
    }


  },
  actions: {

    shopcarData(context, payload) {
      // console.log(payload);
      context.commit("noRepeatShopcar", payload)
      context.commit("pushShopcarData", payload)
      // context.commit("needChangeShopcar", payload)
    },
    changeStar(context, payload) {
      // console.log(payload);
      context.commit("noRepeatStar", payload)
      context.commit("pushStar", payload)

    }
  },
  modules: {

  }
})
export default store
