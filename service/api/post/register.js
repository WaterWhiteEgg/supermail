// 建立后端路由
// 这里处理登录的请求
const express = require('express')
const expressjoi = require('@escook/express-joi')

// 导入表单验证规则
const { registerText } = require('../../middleware/joi')
// 利用express建立一个路由
const router = express.Router()

const { SQLusername } = require("./tosql/sqlOperational")
router.post("/register", expressjoi(registerText), (req, res) => {
    // 开始处理登录，首先通过表单验证的数据都是可以过了的
    // 首先检查数据库里面有没有这个用户名

    SQLusername(req.body.username).then((resolve) => {
        res.send(resolve)
    }).catch((err) => {
        res.cc(err)
    })

})


module.exports = router