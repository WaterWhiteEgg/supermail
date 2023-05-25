// 表单验证中间件
const joi = require("joi")

// 正则表达式
// 表示必须用数字与字母组成，并且在6-20之间
const pwReg = /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,20}$/
// 表示在1-20之间的任意字符
const umReg = /^\S{1,20}$/
// 表示匹配电子邮箱的格式 必须有那几个特殊符号等
const emReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 验证码集
// string()匹配字符,number()匹配数字,regex()加入正则,required()不能为空,min()max()最大/最小长度
const password = joi.string().regex(pwReg).required()
const username = joi.string().regex(umReg).required()
const uid = joi.number().min(1)
const email = joi.string().regex(emReg).required()



// 这里规定要验证什么信息，并导出
module.exports.registerText = {
    body: {
        username,
        password
    }
}
module.exports.loginTest = {
    body: {
        username,
        password,
        email
    }
}
module.exports.emailTest = {
    body:{
        email
    }
}
