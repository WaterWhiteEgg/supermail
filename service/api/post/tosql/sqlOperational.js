// 处理数据库操作的文件，模块课化使用
// 引入封装好的数据库文件
// 用 Promise 的特性链式使用模块

const db = require('../../../db/mysql')

// 加密模块，保护数据库密码的安全
const bcrypt = require("bcryptjs")
// 时间模块，更方便的获取时间戳
const dayjs = require("dayjs")

// 处理是否查到唯一一个用户名
const SQLusername = function (body) {
    return new Promise((resolve, reject) => {
        db.query("select * from userdata where username=?", body.username, (err, result) => {
            // 让Promise的catch捕捉错误
            if (err) {
                reject(err)
            }
            // 如果长度不唯一的话，那就是重复？或者没注册，重复的话那就是数据库有问题了。。。
            // 所以提示没注册即可
            if (result.length === 1) {
                resolve({
                    status: 0,
                    message: '查询成功',
                    data: result
                })
            } else {

                reject("没有查询到准确的用户名")
            }

        })
    })

}
const SQLrecord = function (body) {
    // 处理添加用户数据库请求
    return new Promise((resolve, reject) => {
        // 把密码加密
        let hashPassword = bcrypt.hashSync(body.password, 10)
        // 解密码是不可能的了。。。但是能通过bcrypt.compareSync(test,token)的布尔值来判断是不是这个密码
        db.query("insert into userdata(username,password,email) values (?,?,?)",
            [body.username, hashPassword, body.email],
            (err, result) => {
                if (err) { reject(err) }
                // 如果修改了行数是一的话那就是修改成功了
                if (result.affectedRows === 1) {
                    resolve(
                        {
                            status: 0,
                            message: '添加成功',
                        }
                    )
                } else {
                    reject("添加数据库失败")
                }
            })
    })
}

const SQLrecordEmail = function (useremail, code) {
    // 处理添加邮件数据库请求，因为我觉得模块传值有风险，所以封装就算了
    return new Promise((resolve, reject) => {
        // 把验证码加密
        let hashCode = bcrypt.hashSync(code.toString(), 10)
        // console.log(hashCode);

        // 解密码是不可能的了。。。但是能通过bcrypt.compareSync(test,token)的布尔值来判断是不是这个密码
        // 加进邮件表里面
        let nowdate = dayjs().format("YYYY-MM-DD HH:mm:ss")
        // console.log(nowdate);
        db.query("insert into emailcode(email,code,start_time) values (?,?,?)",
            [useremail, hashCode, nowdate],
            (err, result) => {
                if (err) { reject(err) }
                // 如果修改了行数是一的话那就是修改成功了
                if (result.affectedRows === 1) {
                    resolve(
                        {
                            status: 0,
                            message: '添加成功',
                        }
                    )
                } else {
                    reject("添加数据库失败")
                }
            })
    })
}


const SQLregister = function (body) {
    // 处理登录请求
    // 检测是否是唯一的用户名
    return new Promise((resolve, reject) => {
        SQLusername(body).then((SQLusernameResolve) => {
            // 检测密码其对应的密码是否正确
            // console.log(body.password ,SQLusernameResolve.data[0].password);
            if (body.password === SQLusernameResolve.data[0].password) {
                resolve({
                    status: 0,
                    message: '查询成功',
                })
            } else {
                reject("密码错误")
            }
        }).catch((err) => {
            reject(err)
        })
    })
}




module.exports.SQLusername = SQLusername
module.exports.SQLrecord = SQLrecord
module.exports.SQLrecordEmail = SQLrecordEmail

module.exports.SQLregister = SQLregister