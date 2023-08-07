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
                // 这里返回不直接用res.cc处理，catch要分析是否需要处理别的事
                // 这里的报错处理反过来变正确的事了,要注意由于网络报错也可能这样错

                reject(
                    {
                        status: 1,
                        message: '没有查询到准确的用户名',
                    }

                )
            }

        })
    })

}
const SQLpushCartlists = function (body) {
    // 处理建立新cartlists列请求
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO cartlists(username) VALUES (?)", body.username, (err, result) => {
            if (err) { reject(err) }
            // 如果修改了行数是一的话那就是修改成功了
            if (result.affectedRows === 1) {
                resolve({
                    status: 0,
                    message: "添加成功"
                })
            }
        })
    })
}
const SQLpushCartlistStars = function (body) {
    // 处理建立新cartlistStars列请求
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO cartliststars(username) VALUES (?)", body.username, (err, result) => {
            if (err) { reject(err) }
            // 如果修改了行数是一的话那就是修改成功了
            if (result.affectedRows === 1) {
                resolve({
                    status: 0,
                    message: "添加成功"
                })
            }
        })
    })
}

const doSQLrecord = function (body) {
    return new Promise((resolve, reject) => {
        // 把密码加密
        let hashPassword = bcrypt.hashSync(body.password, 10)
        // 解密码是不可能的,但是能通过bcrypt.compareSync(test,token)的布尔值来判断是不是这个密码
        // 加入默认提供的值，并在注册时给token
        const datatoken = crypto.randomBytes(64).toString('hex');

        db.query("insert into userdata(username,password,email,token) values (?,?,?,?)",
            [body.username, hashPassword, body.email, datatoken],
            (err, result) => {
                if (err) { reject(err) }
                // 如果修改了行数是一的话那就是修改成功了
                if (result.affectedRows === 1) {
                    // 将一些要显示的数据封装对象
                    let user = {
                        username: body.username,
                        email: body.email
                    }
                    resolve(
                        {
                            status: 0,
                            message: '添加成功',
                            data: {
                                user,
                                token: jwt.sign(user, datatoken, { expiresIn: "8h" })
                            }
                        }
                    )
                } else {
                    reject("添加数据库失败")
                }
            })
    })

}

// 处理添注册请求
const SQLrecord = function (body) {
    const promise1 = doSQLrecord(body);
    const promise2 = SQLpushCartlistStars(body);
    const promise3 = SQLpushCartlists(body);
    return Promise.all([
        promise1, promise2, promise3
    ])
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



const SQLregister = function (body, SQLusernameResolve) {
    // 处理登录请求
    return new Promise((resolve, reject) => {
        // 检测密码其对应的密码是否正确
        // 使用加密模块
        let passwordFlag = bcrypt.compareSync(body.password, SQLusernameResolve.data[0].password)

        if (passwordFlag) {
            // 屏蔽掉password数据
            const user = SQLusernameResolve.data[0];
            delete user.password;
            // 处理成功将token的值固定出来并更新到数据库里
            // 一个随机的密钥token
            const datatoken = crypto.randomBytes(64).toString('hex');
            db.query("update userdata SET token = ? where username = ?", [datatoken, SQLusernameResolve.data[0].username], (err, result) => {
                if (err) { reject(err) }
                if (result.affectedRows === 1) {
                    resolve({
                        status: 0,
                        message: '查询成功',
                        data: {
                            user,
                            token: jwt.sign(user, datatoken, { expiresIn: "8h" })
                        }

                    })
                } else {
                    reject("传输token时错误")
                }
            })
        } else {
            reject("密码错误")
        }

    })
}
// 执行添加购物车操作
const SQLcartListsRepeat = function (username, data) {
    return new Promise((resolve, reject) => {
        // 搜寻是否有该用户名
        SQLcartListsSelectRepeat(username, data).then((res1) => {
            // 执行搜寻成功的
            let arr = []
            // console.log(result[0].data);
            if (res1.data[0].data.length != 0) {
                arr = res1.data[0].data
            }
            arr.push(data)
            // 存上去
            SQLcartListsUpdate(arr, username).then((res2) => {
                resolve(res2)
            })
        }).catch((err) => {
            reject(err)
        })



        // console.log(result);
    })
}
// 验证cartlists里面的数据是否重复

const SQLcartListsSelectRepeat = function (username, data) {
    return new Promise((resolve, reject) => {

        db.query("select * from cartlists where username = ?", username, (err, result) => {
            if (err) { reject(err) }
            // 如果长度为1就证明有
            if (result.length === 1) {

                // 使用集合（Set）进行查重操作具有以下几个优势，这也是它在效率上比较高的原因：

                // 快速查找：集合内部使用哈希表实现，查找操作的时间复杂度为 O(1)，即无论集合中有多少元素，查找所需的时间都是恒定的。

                // 自动去重：集合本身的特性就是不允许存在重复元素，因此向集合中添加元素时，会自动去除重复项，确保集合中的元素是唯一的。

                // 这里查询 result[0].data的数据...
                // 新建一个集合对象
                const uniqueData = new Set();
                for (const item of result[0].data) {
                    // 循环遍历添加数据库的item，同时对比发送过来的data.iid，如果显示重复就提出异常
                    uniqueData.add(item.iid)
                    // console.log(uniqueData.has(data.iid));
                    if (uniqueData.has(data.iid)) {
                        reject("重复的添加")
                    }
                }

                // uniqueData 中存储了去重后的数据
                resolve({ status: 0, message: "查询成功", data: result })
            } else {
                reject("未能查询到该用户的数据")
            }
        })
    })

}
// 存储更新cartlists数据
const SQLcartListsUpdate = function (arr, username) {
    return new Promise((resolve, reject) => {
        // 存储cartlists的购物车数据
        // console.log(arr);
        db.query("update cartlists SET data = ? where username = ?", [JSON.stringify(arr), username], (err, result) => {
            if (err) { reject(err) }

            if (result.affectedRows === 1) {
                // 这里代表执行成功
                resolve({
                    status: 0,
                    message: "执行成功"
                })
            } else {
                reject("执行失败")
            }

        })
    })
}
// 执行cartlists查询后将重复的数据去除然后提供新数组
const SQLcartListsRemoveSelect = function (username, data) {
    return new Promise((resolve, reject) => {

        db.query("select * from cartlists where username = ?", username, (err, result) => {
            if (err) { reject(err) }
            // 如果长度为1就证明有
            if (result.length === 1) {
                let arr = result[0].data
                // 将这个数据删除，可以这样遍历
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].iid === data.iid) {
                        arr.splice(i, 1);
                        break; // 找到重复项后跳出内层循环
                    }
                }
                // 这个筛出来的arr就是删除后的数组
                resolve({ status: 0, message: "删除成功", data: arr })
            } else {
                reject("未能查询到该用户的数据")
            }
        })
    })

}

// 更改cartlists里面的data数据，重点是删除里面相同的iid达到删除某个值的效果
const SQLcartListsRemoveUpdate = function (username, data) {
    return new Promise((resolve, reject) => {
        // 搜索username相同的data，然后去除相同的iid返回新arr
        SQLcartListsRemoveSelect(username, data).then((res1) => {
            // 更新cartlists
            SQLcartListsUpdate(res1.data, username).then((res2) => {
                resolve(res2.message)
            }).catch(
                (err) => { reject(err) }
            )

        }).catch(
            (err) => { reject(err) }
        )
        // 将数据库的data搜索出相同iid是数据
    })
}
// 搜索收藏cartliststars里面的元素
const selsctCartliststars = function (username) {
    return new Promise((resolve, reject) => {
        db.query("select * from cartliststars where username = ?", username, (err, result) => {
            if (err) { reject(err) }
            // 如果长度为1就证明有
            if (result.length === 1) {
                // uniqueData 中存储了去重后的数据
                resolve({ status: 0, message: "查询成功", MYSQLdatas: result[0].data })
            } else {
                reject("未能查询到该用户的数据")
            }
        })
    })
}
// 制作收藏接口的查重以及push到数据库里面
const doPushCartliststars = function (MYSQLdatas, data, username) {
    return new Promise((resolve, reject) => {
        // 查重
        let arr = []
        // -长度为0时是空的，不需要查重
        if (MYSQLdatas === null || MYSQLdatas.length === 0) {
            // 添加进收藏
            arr.push(data)

        } else {
            // -不是空的话，需要经历遍历保证里面的iid不唯一
            const uniqueData = new Set();
            for (const item of MYSQLdatas) {
                // 循环遍历添加数据库的item，同时对比发送过来的data.iid，如果显示重复就提出异常
                uniqueData.add(item.iid)
                // console.log(uniqueData.has(data.iid));
                if (uniqueData.has(data.iid)) {
                    reject("重复的添加")
                }
            }
            // 查重通过后允许执行给数据库的数据push
            arr = MYSQLdatas
            arr.push(data)
        }
        db.query("update cartliststars SET data = ? where username = ?", [JSON.stringify(arr), username], (err, result) => {
            if (err) { reject(err) }

            if (result.affectedRows === 1) {
                // 这里代表执行成功
                resolve({
                    status: 0,
                    message: "执行成功"
                })
            } else {
                reject("执行失败")
            }

        })


    })
}

// push收藏到数据库里
const pushCartliststars = function (username, data) {
    return new Promise((resolve, reject) => {
        selsctCartliststars(username).then((res) => {
            doPushCartliststars(JSON.parse(res.MYSQLdatas), data, username).then((res2) => {
                resolve(res2)

            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            reject(err)
        })

    })
}
// 处理查找删除的对象以及更新数据库
const doremoveCartliststars = function (MYSQLdatas, username, data) {
    return new Promise((resolve, reject) => {
        // 查询数据库数组哪个元素需要删除并且覆盖变为新数组
        let arr = MYSQLdatas
        // 将这个数据删除，可以这样遍历
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].iid === data.iid) {
                arr.splice(i, 1);
                break; // 找到重复项后跳出内层循环
            }
        }
        // 然后更新这个数组提交给数据库
        db.query("update cartliststars SET data = ? where username = ?", [JSON.stringify(arr), username], (err, result) => {
            if (err) { reject(err) }

            if (result.affectedRows === 1) {
                // 这里代表执行成功
                resolve({
                    status: 0,
                    message: "执行成功"
                })
            } else {
                reject("执行失败")
            }


        })

    })
}
// 删除收藏
const removeCartliststars = function (username, data) {
    return new Promise((resolve, reject) => {
        selsctCartliststars(username).then((res) => {
            doremoveCartliststars(JSON.parse(res.MYSQLdatas), username, data).then((res2) => {
                // 处理删除成功
                resolve(res2)
            })

        }).catch((err) => {
            reject(err)

        }).catch(
            (err) => { reject(err) }
        )

    })
}





module.exports.SQLusername = SQLusername
module.exports.SQLrecord = SQLrecord
module.exports.SQLrecordEmail = SQLrecordEmail
module.exports.SQLemailCode = SQLemailCode

module.exports.SQLregister = SQLregister
module.exports.SQLcartListsRepeat = SQLcartListsRepeat
module.exports.SQLcartListsRemoveUpdate = SQLcartListsRemoveUpdate

module.exports.pushCartliststars = pushCartliststars
module.exports.removeCartliststars = removeCartliststars