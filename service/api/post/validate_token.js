const express = require('express')
const expressjoi = require('@escook/express-joi')
// 利用express建立一个路由
const router = express.Router()
// 导入表单验证规则
const { usernameTest } = require('../../middleware/joi')
// 数据库处理的方法
const { SQLusername } = require("./tosql/sqlOperational")
// router.use(authenticateToken)
router.post("/api/validate-token", (req, res) => {
    // 这里仅用于验证token是否过期有问题，并解析结果
    // 如果没问题都会直接返回的
    // 失败后会被中间件返回401
    res.send({
        status: 0,
        message: "验证成功",
        tokenData: req.auth,
    })
})


router.post("/login/username", expressjoi(usernameTest), (req, res) => {
    // 处理注册用户名的验证
    // 验证是否重复的用户名，可以利用 SQLusername 有没有返回查询成功的值，如果有那就证明重复了

    SQLusername(req.body).then((resolve) => {

        res.cc("检测到重复的用户名")

    }).catch((err) => {
        // 这里的报错处理反过来变正确的事了,要注意由于网络报错也可能这样错
        err.status === 1 ?
            res.send({
                status: 0,
                message: err.message
            }) : res.cc("网络错误")


    }



    )


})


module.exports = router