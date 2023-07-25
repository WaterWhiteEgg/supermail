// 处理数据库操作的文件，模块课化使用
// 引入封装好的数据库文件
// 用 Promise 的特性链式使用模块

const db = require('../../../db/mysql')

// 加密模块，保护数据库密码的安全
const bcrypt = require("bcryptjs")
// 时间模块，更方便的获取时间戳
const dayjs = require("dayjs")
const crypto = require("crypto")

// 加token验证，这里用于做token
const { jwt } = require("../../../middleware/jwt")


const SQLcartListsSelect = function (username) {
    return new Promise((resolve, reject) => {

        db.query("select * from cartlists where username = ?", username, (err, result) => {
            if (err) { reject(err) }
            // 如果长度为1就证明有
            if (result.length === 1) {
                resolve({
                    status: 0,
                    message: "搜寻成功",
                    data: result
                })
            } else {
                reject("未能查询到该用户的数据")
            }
        })
    })

}
module.exports.SQLcartListsSelect = SQLcartListsSelect