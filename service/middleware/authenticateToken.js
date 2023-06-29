const { jwt } = require("./jwt")
const { sqlToken } = require('../api/post/tosql/sqlProcessing.js');
const jwt_decode = require('jwt-decode');

// 排除某个中间件
const { excludedPaths } = require('../middleware/config');

const authenticateToken = function (req, res, next) {



    // 检查当前请求路径是否在排除列表中
    // 首先，我们通过 typeof 操作符检查当前路径是否是一个字符串类型。如果是字符串类型，我们将当前路径
    // 与指定的路径进行严格相等比较 (===)。如果相等，
    // 则返回 true，表示当前路径需要被排除。
    // 如果当前路径不是字符串类型，我们继续检查当前路径是否是正则表达式类型。我们使用 instanceof 操作符
    // 来判断当前路径是否是 RegExp 的实例。如果是正则表达式类型，我们使用 test() 方法
    // 来测试当前路径是否匹配该正则表达式。如果匹配成功，则返回 true，表示当前路径需要被排除。
    // 如果以上两种情况都不满足，即当前路径不是字符串类型也不是正则表达式类型，我们返回 false，
    // 表示当前路径不需要被排除。

    if (excludedPaths.some(path => {
        if (typeof path === 'string') {
            return req.path === path;
        }
        if (path instanceof RegExp) {
            return path.test(req.path);
        }
        return false;
    })) {
        // 当前路径在排除列表中，无需进行身份验证
        next();
    } else {
        // 在这里编写身份验证逻辑
        // 如果验证成功，调用 next() 继续处理下一个中间件或路由处理程序
        // 如果验证失败，可以通过返回错误响应来终止请求
        // 获取前端传递的请求头带的Authorization
        const token = req.get('Authorization');
        // 将其用jwt_decode解析并获得其username
        const username = getUsernameFromToken(token);
        // 去除Bearer 开头
        const newToken = token.replace('Bearer ', '');
        // 数据库查询相对应的token
        // 通过promise返回
        sqlToken(username)
            .then(data => {
                // jwt.verify用来验证token以及Bearer 的相关性,通过err返回错误以及decoded返回解析
                // 第一个参数需要去掉Bearer !前!缀，第二个就是token，第三个是解析算法（可忽略），第四个就是解析
                jwt.verify(newToken, data.data, { algorithms: ['HS256'] }, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        return res.cc("token错误")
                    }
                    // console.log(decoded);
                    // 让里面的 req.auth变成decoded的值，因为最开始利用esjwt的值也是这样给的，但是esjwt
                    // 已经是封装好了的，无法做这么多事情
                    req.auth = decoded;
                    next();
                });
            })
            .catch(error => {
                return res.cc("网络错误")
            });
    }

}
// 加入unless


module.exports.authenticateToken = authenticateToken

// 从 token 中解析用户名
const getUsernameFromToken = function (token) {
    // console.log('Received token:', token);
    const decodedToken = jwt_decode(token)
    // console.log('Decoded token:', decodedToken);

    return decodedToken.username;
}

module.exports.getUsernameFromToken = getUsernameFromToken