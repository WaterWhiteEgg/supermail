// 混入相关的东西。。。
// 混入是重复利用代码，只要引用了这个组件，并建立一个数组，就可以使用混入
// 混入需要你建立一个变量如const，导出去
// 写上要复用的代码，比如生命周期的一个方法用的次数很多，你可以
// 需要的组件引入即可，它甚至某个组件用的次数太多了也可以混入，减少大量的重复代码
export const sorollRefresh = {
    mounted() {
        this.$refs.scroll.bs.refresh();
        // console.log('ok');
    },

}