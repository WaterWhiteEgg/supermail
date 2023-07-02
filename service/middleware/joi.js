// 表单验证中间件
const joi = require("joi")

// 正则表达式
// 表示必须用数字与字母组成，并且在6-20之间
const pwReg = /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,20}$/
        // 表示在1-20之间的任意字符,不能输入特殊符号,允许中文
const umReg = /^[\u4E00-\u9FFFa-zA-Z0-9_]{1,20}$/;
// 表示匹配电子邮箱的格式 必须有那几个特殊符号等
const emReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 验证码集
// string()匹配字符,number()匹配数字,regex()加入正则,required()不能为空,min()max()最大/最小长度
const password = joi.string().regex(pwReg).required()
const username = joi.string().regex(umReg).required()
const id = joi.number().min(1)
const email = joi.string().regex(emReg).required()
const code = joi.number().integer().min(100000).max(999999).required()



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
        email,
        code
    }
}
module.exports.emailTest = {
    body: {
        email
    }
}
module.exports.emailCodeTest = {
    body: {
        email,
        code
    }
}
module.exports.usernameTest = {
    body: {
        username
    }
}