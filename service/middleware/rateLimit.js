
// 防止请求次数过多的三方包
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    // 时间（1分钟）
    windowMs: 1 * 60 * 1000,
    // 规定时间内请求的最大次数（100）
    max: 100,
});
module.exports = limiter