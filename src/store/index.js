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
    donPushZero(state, payload) {
      if (payload.length == 0) {
        state[payload.donChangeState] = true
        return 0
      }
    },
    delStateList(state, payload) {
      for (let i = 0; i < state[payload.array].length; i++) {
        console.log(state[payload.array][i]);
        if (state[payload.array][i] == payload.delPayload ||
          state[payload.array][i].iid == payload.delPayload) {
          state[payload.array].splice(i, 1);
          return 0

        }
      }
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
    needChangeShopcar(state, payload) {
      // console.log(state.cartLists &&
      //   state.cartLists[0] &&
      //   state.cartLists[0].iid);
      this.commit("donPushZero", { length: state.cartLists.length, donChangeState: "donChangeCar" })
      // this.commit("searchRepeat", {
      //   array: "cartLists", donChangeState: "donChangeCar",
      //   changePayload: payload
      // })
      for (let i = 0; i < state.cartLists.length; i++) {
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
    delShopcar(state, payload) {
      this.commit("delStateList", { array: "cartLists", delPayload: payload})


    },
    openPopup(state) {
      state.popup = true
    },
    closePopup(state) {
      state.popup = false
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
      this.commit("donPushZero", { length: state.iidStar.length, donChangeState: "donChangeStar" });
      for (let i = 0; i < state.iidStar.length; i++) {
        // console.log(state.iidStar[i] == payload);
        if (state.iidStar[i] == payload) {
          state.donChangeStar = false
          return 0
        } else {
          state.donChangeStar = true

        }
      }


    },
    delStar(state, payload) {
      this.commit("delStateList", { array: "iidStar", delPayload: payload })

    }


  },
  actions: {

    shopcarData(context, payload) {
      // console.log(payload);
      context.commit("noRepeatShopcar", payload)
      context.commit("pushShopcarData", payload)
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
