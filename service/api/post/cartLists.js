const express = require('express')
const expressjoi = require('@escook/express-joi')
const { cartListsTest } = require('../../middleware/joi')
// 特别解释一下这个包，crypto是node内置的包，提供了一些加密和哈希算法，我使用它是为了用它的
// crypto.randomBytes(length)生产一定长的的随机字符串
// crypto.randomInt(length)提供一定长的随机数字
const { SQLcartListsRepeat } = require("../post/tosql/sqlOperational")
const crypto = require("crypto")

const router = express.Router()


router.post("/shop/pushdata", (req, res) => {
    SQLcartListsRepeat(req.auth.username, req.body).then((resolve) => {
        // console.log(res);
        res.send({
            status:0,
            message:"加入购物车成功"
        })
    }).catch((err) => {
        res.cc(err)
    })
    // console.log(req.auth);

})
router.post("/shop/removedata", (req, res) => {
    SQLcartListsRepeat(req.auth.username, req.body).then((resolve) => {
        // console.log(res);
        res.send({
            status:0,
            message:"加入购物车成功"
        })
    }).catch((err) => {
        res.cc(err)
    })
    // console.log(req.auth);

})




module.exports = router