
const mysql = require("mysql2")


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: "3306",
    database: "user",
})




module.exports = db