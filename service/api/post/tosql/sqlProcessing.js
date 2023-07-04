    // 处理内部数据库操作的文件，不会提供给接口
    // 引入封装好的数据库文件
    // 用 Promise 的特性链式使用模块

    const db = require('../../../db/mysql')

    // 加密模块，保护数据库密码的安全
    const bcrypt = require("bcryptjs")

    // 处理查询token值并返回给token
    module.exports.sqlToken = function (username) {
        return new Promise((resolve, reject) => {
            db.query("select * from userdata where username = ?", username, (err, result) => {
                if (err) { reject(err) }
                if (result.length === 1) {
                    resolve({
                        status: 0,
                        message:"查找成功",
                        data: result[0].token
                    })
                }else{
                    reject("查找失败")
                }

            })

        })


    }