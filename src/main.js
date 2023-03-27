import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/img/whiting.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// // vue2 监听原理（简洁）

// const obj = {
//   aaa: "s",
//   bbb: 2,
// }
// // 首先一开始有个来自data的数据，记得那个你要return的data吗

// // *这里是发布订阅者模式的思想,可以先看下文
// class Dep {
//   // 创建一个Dep的类
//   constructor() {
//     // 在构造函数里放入一个数组记录所有要观察的元素 *subscribes订阅(复)
//     this.subscribes = []
//     // 那么谁给他数据呢,我们创建一个addsubs()方法
//   }
//   addsubs(watch) {
//     this.subscribes.push(watch)
//     // 这样就可以加进数组了
//   },
//   notify() {
//     // 用于遍历数组寻找对应的值
//     this.subscribes.forEach(item => {
//       item.update()
//     })
//   }
// }
// // 谁观察这个类的变化执行呢,得在这里创建一个类
// // 这里记录的谁订阅
// class Watcher {
//   constructor(name) {
//     this.name = name
//   }
//   // 由于数据会变化,要执行变化的话也得更新
//   update() {
//     console.log("执行更新");
//   }
// }
// // 大家看不懂为什么这样设计没关系,跟我看
// // 首先我们要一个<p/ id='p1'>进入开发订阅者模式的话,你首先得获得这个的变量const p
// // 怎么将变成这种模式内的呢,首先让他通过watcher类变成另一种对象,通过传id的方式
//  const html1 = new Watcher("pi")
// // 仔细看看对应的类会使这个 html1 里面包含什么内容
// // 加到这里也没什么用,知道了 html1 对应者这个p标签而已,但是这时候
// // 我们可以使用Dep类, 将这个 html1 值给加进去, 这样Dep类就有了 html1 的数据
// // 当然,class不是变量存不了数据,可以这样
//  const Dep = new Dep()
// // 这样这个Dep变量就有Dep类的方法了   *对象在js里哪怕是const常量也是可以改变值的
// // 使用Dep里的addsubs方法加进去
//  Dep.addsubs(html1)
// // 这样多执行几次Dep里的数组就有着非常多的数据,同时有着对应的 html 了
// // 那想更新某个值的时候,怎么找到对应的 html 呢,比如说我想找到刚才的 html1 ,然后给他来一梭子
// // 那不用想这么复杂,万物皆可for循环解决,遍历后比较值,那些名字相对应的全返回过去就行了
// // 所以在Dep类里,又有一个方法叫notify() *notify 通知
// // 当然,这一个个比较性能就太慢了,不如全执行,所以你看到每一个Watcher里面都有一个更新方法
// // 当你需要更新,就使用遍历将其更新方法再执行一次,当你这个更新方法数据之类不一样的时候,重新执行不就做到更新了吗
//  Dep.notify()



// // 拿到这份数据，要想实现这功能得有两问题
// // 1我怎么知道你要监听，你要变化
// // 2我怎么改，这个改能重新渲染html界面吗

// const Dep = new Dep()
// //这个Dep具体查看发布订阅者模式

// // 首先得知道每个值的对应关系，同时用循环将其所有遍历出来，这样才能知道谁是对应xx值
// Object.keys(obj).forEach(key => {
//   // keys方法将其的"键"给做成一个数组返回
//   // forEach根据数组长度循环遍历执行方法,里面的key虚参是数组对应的值
//   // 将obj[key]给value赋值，value里的值就是对应的数据了
//   let value = obj[key]
//   // 单独获得‘键’ ‘对’有很多好处，但是怎么知道这个 ‘对’改了数据呢
//   // 从obj本身的话很难直接找出是谁在用，这时候可以利用Obj的一个方法

//   // Object.defineProperty(obj,key,"hello world")
//   // defineProperty可以在一个对象上定义或修改一个新属性，第一个值是哪个对象，第二个是要修改的键的名字，第三个是属性值
//   Object.defineProperty(obj, key, {
//     // 在es6里，你可以在defineProperty,defineProperties里用这个对象将你的属性值变为存取器

//     // 一旦有了这个get set 你不觉得就可以监听读取和输入，并且能做很多事了吗
//     get() {
//       // 每当你使用了这个函数就代表着有东西要读取它
//       // 你想想一开始的时候是不是一定要读取一下这个值的, 不然怎么知道你要放怎么值
//       // 所以在开头读取值时,可以在这里绑定类似name的东西,如果你看过set的解释的话那就是发布订阅者模式
//       // 这样当set改变时他能知道,谁要变
//       console.log("读取了这个对象的值就会执行");

//       const html1 = new Watcher("pi")
//       Dep.addsubs(html1)
//       // 这两行是发布订阅者模式的赋予名字且将其推送给Dep的行为

//       // 这里要返回值，因为是读取函数，不返回值的话就读取失败了
//       return value

//     },
//     set(newvalue) {

//       console.log("改变了这个对象的值就会执行");
//       value = newvalue;
//       // 监听有没有新的改变,有新是改变就将最新的值给value

//       // 我知道确实有人执行了set，但是我怎么通知给谁变值呢
//       // 用this吗，但是this是这个对象，怎么知道指向某个html标签呢
//       // vue给html里面的元素进行了解析，比如给使用了双括号，v-html之类的，他就会给这个元素加个类似name的东西获取到谁需要用
//       // 虽然如此，不止一个标签用的情况怎么让他一起变呢，一般想到就是“相同名字的元素一起将其变化”，但仔细想想相同名字会冲突啊
//       // 没错，这时候需要用数组存着相同名字但是元素不同的html标签，这时候就要用到一个概念
//       // 发布订阅者模式

//        Dep.notify()
//       // 这是发布订阅者模式执行所有update更新的行为
//     }
//   })

// })

