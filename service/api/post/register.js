// 建立后端路由
// 这里处理登录的请求
const express = require('express')
const expressjoi = require('@escook/express-joi')

// 导入表单验证规则
const { registerText, loginTest } = require('../../middleware/joi')
// 利用express建立一个路由
const router = express.Router()

const { SQLusername, SQLregister, SQLrecord } = require("./tosql/sqlOperational")
router.post("/register", expressjoi(registerText), (req, res) => {
    // 处理登录，通过表单验证的数据都是可以过了的

    SQLregister(req.body).then((resolve) => {
        res.send(resolve)
    }).catch((err) => {
        res.cc(err)
    })

})

router.post("/login", expressjoi(loginTest), (req, res) => {
    // 处理注册
    // 验证是否重复的用户名，可以利用 SQLusername 有没有返回查询成功的值，如果有那就证明重复了

    SQLusername(req.body).then((resolve) => {

        res.cc("检测到重复的用户名")

    }).catch(() => {
        
        SQLrecord(req.body).then((resolve) => {
            res.send(resolve)
        }).catch((err) => {
            res.cc(err)
        }
        )
    }
        // 这里的报错处理反过来变正确的事了
        // 没有重复后添加


    )


})



module.exports = router