// 这里建立服务器并链接所有包
// 先引入所需的所有包
const express = require('express')
const app = express()
const cors = require('cors')
// 路由的包
const register = require("./api/post/register")
const email = require("./api/post/emailpost")
// 中间件的包
const error = require('./middleware/error')
// 防止请求次数过多的三方包，封装在别的文件里
const limiter = require("./middleware/rateLimit");
// 生成token，用户账户安全，同时可以储在本地验证是否允许请求（你也可以在后端设置一些需要token才能进去的api）
const { esjwt, token } = require("./middleware/jwt")




// 使用error中间件
app.use(error)
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 解析 application/json
app.use(express.json());
// 允许所有跨域请求
app.use(cors())
// 使用防止请求次数过多
app.use(limiter);
// 使用token验证，排除一些不需要验证的
app.use(esjwt({ secret: token, algorithms: ["HS256"] }).unless({ path: [/^\/email\//, "/login", "/register"] }))






// 引入需要的路由
app.use(register, email)






app.listen("8080", () => {
    console.log("sussess");
})

