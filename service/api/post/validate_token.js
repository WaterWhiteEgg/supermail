const express = require('express')
const expressjoi = require('@escook/express-joi')
// 利用express建立一个路由
const router = express.Router()


router.post("/api/validate-token", (req, res) => {
    // 这里仅用于验证token是否过期有问题
    // 如果没问题都会直接返回的
    // 失败后会被中间件返回401
    console.log("hi");
        res.send({
            status: 0,
            message: "验证成功",
            tokenData: req.auth,
        })



})

module.exports = router