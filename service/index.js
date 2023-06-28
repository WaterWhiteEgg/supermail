// 这里建立服务器并链接所有包
// 先引入所需的所有包
const express = require('express')
const app = express()
const cors = require('cors')
// 路由的包
const register = require("./api/post/register")
const email = require("./api/post/emailpost")
const validateToken = require("./api/post/validate_token")
// 中间件的包
const error = require('./middleware/error')
// 防止请求次数过多的三方包，封装在别的文件里
const limiter = require("./middleware/rateLimit");
// 生成token，用户账户安全，同时可以储在本地验证是否允许请求（你也可以在后端设置一些需要token才能进去的api）
const { esjwt } = require("./middleware/jwt")
const { sqlToken } = require('./api/post/tosql/sqlProcessing');


// 排除某个中间件，除非他被使用
const unless = require('express-unless');


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
// 使用token验证，unless是排除一些不需要验证的

// JWT 验证中间件
const jwtMiddleware = esjwt({
    secret: "your_secret_key",
    algorithms: ['HS256']
}).unless({ path: [/^\/email\//, '/login', '/register'] });

// 在指定路径上应用 JWT 验证中间件
// app.use(jwtMiddleware);


// app.use(esjwt({ secret: " ", algorithms: ["HS256"] }).unless({ path: [/^\/email\//, "/login", "/register"] }))






// 引入需要的路由
app.use(register, email, validateToken)
// 排除特定的路径






app.listen("8080", () => {
    console.log("sussess");
})

