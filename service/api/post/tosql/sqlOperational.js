// 处理数据库操作的文件，模块课化使用
// 引入封装好的数据库文件
// 用 Promise 的特性链式使用模块

const db = require('../../../db/mysql')

// 加密模块，保护数据库密码的安全
const bcrypt = require("bcryptjs")
// 时间模块，更方便的获取时间戳
const dayjs = require("dayjs")

// 加token验证，这里用于做token
const { jwt, token } = require("../../../middleware/jwt")
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
        // 这是我又想到了，如果邮箱重复的话有一堆请求以及code
        // 所以为了避免重复，如果已经发送过了还要发(他奶奶的)，就把他改成修改code
        // 所以先搜索有没有重复邮箱,我觉得直接修改邮箱先，没有的话就证明需要添加
        // 但是可能有bug？所以还是搜了先吧
        db.query("select * from emailcode where email=? ", useremail, (err, result) => {
            if (err) { reject(err) }
            // 长度为1的话那就是已经有了，直接改这个值就行
            if (result.length === 1) {
                db.query("update emailcode SET code = ?,start_time = ? WHERE email = ?",
                    [hashCode, dayjs().format("YYYY-MM-DD HH:mm:ss"), useremail],
                    (uperr, upresult) => {
                        if (uperr) { reject(uperr) }
                        // 修改行数为1的话那就证明成功了
                        // console.log(upresult);
                        if (upresult.affectedRows === 1) {
                            resolve({
                                status: 0,
                                message: "修改成功"
                            })
                        } else {
                            reject("服务器获取code失败")
                        }
                        return 0
                    }
                )
            } else {
                // 如果没有result.length === 1 ，也就不会执行更新语句，直接执行添加
                db.query("insert into emailcode(email,code,start_time) values (?,?,?)",
                    [useremail, hashCode, dayjs().format("YYYY-MM-DD HH:mm:ss")],
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
            }
        })

    })
}

const SQLemailCode = function (body) {
    // 处理用户code是否与数据库一致的请求
    return new Promise((resolve, reject) => {
        // 检查是哪个邮箱发送的
        db.query("select * from emailcode where email=?", body.email, (err, result) => {
            if (err) { reject(err) }
            // 如果成功了的长度应该是1
            if (result.length === 1) {
                // 找到唯一值后也要检测验证码是否对
                // 需要用bcrypt.compareSync(new，old)方式解密返回布尔值
                let flag = bcrypt.compareSync(body.code.toString(), result[0].code)
                if (flag) {

                    // 成功
                    // 但是你想想，一般情况下，时间太久code也能用，这好吗，这不好
                    // 所以，想要验证成功，得在现在的时间与在数据库内被记录的世界相同才行
                    // 使用dayjs更方便的操作他们！diff() 函数计算它们之间的时间差
                    let diffInSeconds = dayjs().diff(result[0].start_time, "second")
                    // console.log(diffInSeconds);
                    // 如果diffInSeconds大于300s(也就是5分钟)就算对了也不能对
                    if (diffInSeconds <= 300) {
                        resolve({
                            status: 0,
                            message: "查询成功"
                        })
                    } else {
                        reject("验证码超时！")
                    }

                } else {
                    reject("验证码不准确！")
                }



            } else {
                reject("查询失败！")
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
                // 屏蔽掉password数据
                const user = SQLusernameResolve.data[0];
                delete user.password;
                resolve({
                    status: 0,
                    message: '查询成功',
                    data: {
                        user,
                        token: jwt.sign(user, token, { expiresIn: "60s" })
                    }

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
module.exports.SQLemailCode = SQLemailCode

module.exports.SQLregister = SQLregister