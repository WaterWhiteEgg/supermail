module.exports = (req, res, next) => {
    // 错误信息显示组件
    res.cc = function (err, status = 1) {
        res.send({
            status,
            // 判断err是否是 Error 类型的实例 （instanceof的作用） 
            // 如果是，那么其 message 属性存储了错误信息
            // 如果不是，那么这个err可能本身就是错误信息，直接返回即可
            message: err instanceof Error ? err.message : err
        })
    }
    next()
}




