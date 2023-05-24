// 处理数据库操作的文件，模块课化使用
// 引入封装好的数据库文件
// 用 Promise 的特性链式使用模块

const db = require('../../../db/mysql')

module.exports.SQLusername = function (bodyusername) {
    return new Promise((resolve, reject) => {

        db.query("select * from userdata where username=?", bodyusername, (err, result) => {
            // 让Promise的catch捕捉错误
            if (err) { resolve(err) }
            // 如果长度不唯一的话，那就是重复？或者没注册，重复的话那就是数据库有问题了。。。
            // 所以提示没注册即可
            if (result.length === 1) {
                reject({
                    status: 0,
                    message: '查询成功'
                })
            } else {
                resolve("没有查询到准确的用户名")
            }


        })





    })

}