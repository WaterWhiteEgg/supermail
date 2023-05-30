const express = require('express')
const expressjoi = require('@escook/express-joi')
// 特别解释一下这个包，crypto是node内置的包，提供了一些加密和哈希算法，我使用它是为了用它的
// crypto.randomBytes(length)生产一定长的的随机字符串
// crypto.randomInt(length)提供一定长的随机数字
const crypto = require("crypto")

const router = express.Router()

const transporter = require("../../email/nodemailer")

const { emailTest, emailCodeTest } = require('../../middleware/joi')
const { SQLrecordEmail, SQLemailCode } = require("./tosql/sqlOperational")
// 利用这个crypto生成随机验证码
// 然后通过数据库储存这个让用户去验证
// （还有一种利用缓存记录判断的，不过没怎么学所以就单纯用数据库就好）
// 同时，请参考数据库想要格式的数据，需要code(同时加密),创建时间,用户邮箱


router.post("/email/post", expressjoi(emailTest), (req, res) => {
    // 随机生成一个验证码
    const code = crypto.randomInt(100000, 999999)
    // 处理邮件发送请求
    // 提交的文本格式
    const mailOptions = {
        from: "2733259150@qq.com", // 发件人邮箱地址
        to: req.body.email, // 收件人邮箱地址
        subject: '用于验证supermail的验证码', // 邮件主题
        text: `Your 验证码 code is ${code}，please 保管好 ，别给怪 uncle 给 can can need 了` // 邮件正文
    };

    transporter.sendMail(mailOptions, (error, info) => {
        // info是一个回调函数，包含发送成功的一些信息
        if (error) {
            res.cc(error)
        } else {
            // console.log(info.messageId);
            // 对数据库放入这个code以便于用户对比真假
            SQLrecordEmail(req.body.email, code).then((result) => {
                // 执行成功后
                res.send('邮件已发送，请留意你的邮箱（若有必要可以看看垃圾箱里有没有）')

            }).catch((err) => {
                res.cc(err)
            })


        }
    });
    // 同时进行数据库操作，将这些信息给数据库，用于验证

})

router.post("/email/code", expressjoi(emailCodeTest), (req, res) => {
    SQLemailCode(req.body).then((result) => {
        res.send("验证成功")
    }).catch((err) => {
        res.cc(err)
    })

})


module.exports = router