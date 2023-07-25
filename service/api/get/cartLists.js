const express = require('express')
const expressjoi = require('@escook/express-joi')
const { SQLcartListsSelect } = require("./tosql/sqlOperational")


const router = express.Router()

// 查询cartlists数据，利用token获取用户名
router.get("/shop/selectdata", (req, res) => {
    SQLcartListsSelect(req.auth.username).then((result) => {
        res.send({
            status: 0,
            message: "查询成功",
            data: result.data[0]
        })
    }).catch((err) => {
        res.cc(err)
    })
})





module.exports = router