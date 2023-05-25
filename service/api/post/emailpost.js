const express = require('express')
const expressjoi = require('@escook/express-joi')

const router = express.Router()

const transporter = require("../../email/nodemailer")

const { emailTest } = require('../../middleware/joi')
const code = "baidan"
router.post("/email/post", expressjoi(emailTest), (req, res) => {
    // 处理邮件发送请求
    // 提交的文本格式
    const mailOptions = {
        from: "2733259150@qq.com", // 发件人邮箱地址
        to: req.body.email, // 收件人邮箱地址
        subject: '用于验证supermail的验证码', // 邮件主题
        text: `Your 验证码 code is ${code}，please 保管好 ，目前还没检测失效来着QAQ` // 邮件正文
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.cc(error)
        } else {

            console.log('邮件已发送，请留意你的邮箱（若有必要可以看看垃圾箱里有没有）');
            res.send('邮件已发送，请留意你的邮箱（若有必要可以看看垃圾箱里有没有）')

        }
    });
})


module.exports = router