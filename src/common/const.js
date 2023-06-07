// 放入常量。。。

const ALLCONST = {

    regExps: {
        // 正则表达式
        // 表示必须用数字与字母组成，并且在6-20之间
        pwReg: /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,20}$/,
        // 表示在1-20之间的任意字符
        umReg: /^\S{1,20}$/,
        // 表示匹配电子邮箱的格式 必须有那几个特殊符号等
        emReg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    }
}


export default ALLCONST