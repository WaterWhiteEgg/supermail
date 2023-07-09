import { validateToken } from "../network/api"
import ALLCONST from "../common/const";

// 路由配置文件
import store from '../store/index';

// 这里制作路由的方法


export const beforeEach = (to, from, next) => {
    // 在进入路由之前需要进行的操作
    // 比如身份验证、权限校验等

    // 验证是否需要身份验证
    // 导航守卫函数中，可以通过访问 to.matched 数组来查找当前路由和其父嵌套路由对象中的 meta 属性对象

    // 通过使用 to.matched 数组和 some() 方法并指定回调函数 record => record.meta.requireAuth，
    // 实际上是对当前路由对象及其父嵌套路由对象中的所有 meta 属性对象进行了遍历，
    // 并判断它们是否包含 requireAuth 布尔字段。只要找到一个 requireAuth 值为 true 的 meta 属性对象，
    // some() 方法就会立即返回 true，否则返回 false。
    // 也就是说，true就证明这里面有requireAuth值为true的
    if (to.matched.some(record => record.meta.requireAuth)) {
        validateToken(ALLCONST.codes.token).then((res) => {
            // 如果status是1，证明有错误
            // 由于存在延迟，所以先刷新再进行跳转
            if (!res.data.status) {
                // 这里是验证成功的
                // console.log(res);
                // 改变vuex的值使别人知道是成功的
                // 注意这里是直接引入vuex的因为这里没有vue实例


                next()


            } else {
                console.log(res.data.message);
                // 改变vuex的值使别人知道是失败的

                next("/request");
            }

        }).catch((err) => {
            // 这里是网络错误的的
            // 错误就被next重定向到登录界面
            console.log(err);
            next("/request");
        })
    }
    // 不需要验证的直接next()
    next()
    // to：即将要进入的目标路由对象。
    // from：当前导航正要离开的路由对象。
    // next：一个函数，用来 resolve 这个钩子。
    // 调用 next() 表示 resolve 这个钩子，Vue Router 会继续执行接下来的钩子或正常跳转到目标页面；
    // 调用 next(false) 取消当前导航；调用 next('/') 或者 next({ path: '/' }) 跳转到一个不同的地址，比如首页
    // 调用 next(error) 表示导航被中止且传递一个错误。
}

export const afterEach = (to, from) => {
    // 在离开路由之后需要进行的操作
    // 比如更新浏览历史记录、记录用户行为等
    // 如果是需要token验证的，在时候都要刷新一下


}