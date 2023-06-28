const express = require('express')
const expressjoi = require('@escook/express-joi')
// 利用express建立一个路由

const { jwt } = require("../../middleware/jwt")
const { sqlToken } = require('./tosql/sqlProcessing');
const router = express.Router()
const jwt_decode = require('jwt-decode');

function authenticateToken(req, res, next) {
    const token = req.get('Authorization');
    const username = getUsernameFromToken(token);
    const newToken = token.replace('Bearer ', '');
    
    sqlToken(username)
        .then(data => {
            jwt.verify(newToken, data.data, { algorithms: ['HS256'] }, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.cc("token错误")
                }
                // console.log(decoded);
                req.auth = decoded;
                next();
            });
        })
        .catch(error => {
            return res.cc("网络错误")
        });
}
// authenticateToken.unless = unless;

// 从 token 中解析用户名
function getUsernameFromToken(token) {
    // console.log('Received token:', token);
    const decodedToken = jwt_decode(token)
    // console.log('Decoded token:', decodedToken);

    return decodedToken.username;
}

router.post("/api/validate-token",authenticateToken, (req, res) => {
    // 这里仅用于验证token是否过期有问题
    // 如果没问题都会直接返回的
    // 失败后会被中间件返回401
    res.send({
        status: 0,
        message: "验证成功",
        tokenData: req.auth,
    })



})
router.use(authenticateToken)

module.exports = router