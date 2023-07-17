// 建立后端路由
// 这里处理登录的请求
const express = require('express')
const expressjoi = require('@escook/express-joi')



// 导入表单验证规则
const { registerText, loginTest } = require('../../middleware/joi')
// 利用express建立一个路由
const router = express.Router()

const { SQLusername, SQLregister, SQLrecord, SQLemailCode } = require("./tosql/sqlOperational")
router.post("/register", expressjoi(registerText), (req, res) => {
    // 处理登录，通过表单验证的数据都是可以过了的

    SQLusername(req.body).then((resolve) => {
        // 查询成功时证明找到唯一的username
        SQLregister(req.body, resolve).then((resolve) => {
            res.send(resolve)
        }).catch((err) => {
            res.cc(err)
        })
    })


})


router.post("/login", expressjoi(loginTest), (req, res) => {
    // 处理注册
    // 验证是否重复的用户名，可以利用 SQLusername 有没有返回查询成功的值，如果有那就证明重复了

    SQLusername(req.body).then((resolve) => {

        res.cc("检测到重复的用户名")

    }).catch((catcherr) => {
        // 这里的报错处理反过来变正确的事了,要注意由于网络报错也可能这样错
        // 没有重复后添加
        // 现在又加了一条规则，必须邮箱验证码成功对应才能继续处理登录请求
        if (catcherr.status === 1) {

            SQLemailCode(req.body).then((resolve) => {
                // 这里是code验证码对比处理成功后
                // 处理成功后就可以执行这个
                SQLrecord(req.body).then((resolve) => {
                    // console.log(resolve);
                    res.send(resolve[0])
                })
            }).catch((err) => {
                res.cc(err)
            })

        } else {
            res.cc("网络错误")
        }

    }



    )


})



module.exports = router