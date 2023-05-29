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

// 使用error中间件
app.use(error)
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 解析 application/json
app.use(express.json());
// 允许所有跨域请求
app.use(cors())






// 引入需要的路由
app.use(register,email)






app.listen("8080", () => {
console.log("sussess");
})

