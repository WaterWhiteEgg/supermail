const actions = {

    shopcarData(context, payload) {
        // console.log(payload);
        context.commit("noRepeatShopcar", payload)
        context.commit("pushShopcarData", payload)
    },
    changeStar(context, payload) {
        // console.log(payload);
        context.commit("noRepeatStar", payload)
        context.commit("pushStar", payload)

    },

}
export default actions