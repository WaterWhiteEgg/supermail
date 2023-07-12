const mutations = {
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
            // console.log(state[payload.array][i]);
            if (state[payload.array][i] == payload.delPayload ||
                state[payload.array][i].iid == payload.delPayload) {
                state[payload.array].splice(i, 1);
                return 0

            }
        }
    },
    ifPushNeed(state, { data, ifname, pushname }) {
        // console.log(data);
        if (state[ifname]) {
            state[pushname].push(data);
        } else {
            state[ifname] = true;
        }
    },



    noRepeatShopcar(state, payload) {
        // 这是为了防止一开始监听iid不需要时直接不需要循环了 
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
        this.commit("ifPushNeed", { data: payload, ifname: "needCartPush", pushname: "cartLists" })
        // console.log(payload);




    },
    needChangeShopcar(state, payload) {
        // console.log(state.cartLists &&
        //   state.cartLists[0] &&
        //   state.cartLists[0].iid);
        console.log(state.cartLists);
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
        this.commit("delStateList", { array: "cartLists", delPayload: payload })


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
        this.commit("ifPushNeed", { data: payload, ifname: "needStarPush", pushname: "iidStar" })

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

    },


    checkIsChecked(state, payload) {
        for (let item of state.cartLists) {
            if (!item.isChecked) {
                state.isAllCartListsCheck = false;
                return 0;
            } else {
                state.isAllCartListsCheck = true;

            }
        }
    },
    changeIsAllCartListsCheck(state, payload) {
        state.isAllCartListsCheck = !state.isAllCartListsCheck;
        this.commit("doChangeIsAllCartListsCheck", state.isAllCartListsCheck);

    },

    doChangeIsAllCartListsCheck(state, payload) {
        for (let item of state.cartLists) {
            if (payload) {
                item.isChecked = true;
            } else {
                item.isChecked = false;
            }
        }
    },

    chengeIsRequest(state, payload) {
        state.isRequest = payload
    }


}
export default mutations
