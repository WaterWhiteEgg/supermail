const jwt = require("jsonwebtoken")
// 用于制造token
const expressJWT = require("express-jwt")

const esjwt = expressJWT.expressjwt
// 用于token识别的部署，需要你写入加密方式以及排除等


module.exports.jwt = jwt

module.exports.esjwt = esjwt
// 目前先时秘钥相同，之后给服务器弄好数据库

