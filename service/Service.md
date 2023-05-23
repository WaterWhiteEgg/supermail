## 这里使用的是基于node环境以及express等搭建后端处理环境
运行此环境需要使用
- cd service
用于切换目录
- npm i -S
用于下载所依赖的包
- npx nodemon index.js
运行主要的脚本开启各种api接口
### 注意：启用服务需要mysql 16 版本的支持，以及在db/mysql.js的文件中配置与你数据库相对应的配置
 mysql.createPool({
    host: '你的服务器ip地址，默认开启本地sql服务器', 
    user: 'mysql的账户号，默认root',
    password: 'mysql的密码，默认123456',
    database: "链接的库，默认user",
    port:"路由，默认3306"
 })

如果你缺少mysql的表，可以从db/static/mysqlCSV里面找到对应表格并导入数据
