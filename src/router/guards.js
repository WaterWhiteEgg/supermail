// 这里制作路由的方法
export const beforeEach = (to, from, next) => {
    // 在进入路由之前需要进行的操作
    // 比如身份验证、权限校验等

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
    
}