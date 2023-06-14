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
    database: "链接的库，默认users",
    port:"路由，默认3306"
 })

如果你缺少mysql的表，可以从db/static/mysqlCSV里面找到对应表格并导入数据

## 开启邮箱验证码服务(qq邮箱)
请注意，你需要去qq邮箱里申请POP3/SMTP/IMAP4/Exchange/CardDAV/CalDAV服务才可以使用发送验证码信息
详情进入/email/nodemailer.js 根据提示尝试操作


# 笔记
当你要让用户获得唯一的uid时，不应该用数据库的自增这么简单，尝试这个
---
分布式 ID 生成器通常不是 Node.js 的内置模块，开发者需要使用第三方模块来生成分布式 ID。

以 Twitter 开源的 Snowflake 算法实现的第三方模块 node-snowflake 为例，可以通过以下步骤在 Node.js 中使用分布式 ID 生成器：

安装 node-snowflake 模块
npm install node-snowflake
在代码中引入 node-snowflake 模块，并创建一个 Snowflake 实例
javascript
const Snowflake = require('node-snowflake').Snowflake;
const snowflake = new Snowflake({
  clientId: 1,
  datacenterId: 1
});
在上面的例子中，我们创建了一个 Snowflake 实例，其中 clientId 和 datacenterId 分别代表节点 ID 和数据中心 ID，这两个参数可以根据业务需求来设置。

调用 nextId 方法来生成唯一 ID
javascript
const id = snowflake.nextId();
console.log(id);
在上面的例子中，我们调用了 nextId 方法来生成一个唯一的 ID。nextId 方法会返回一个 64 位的整数，其中包含了时间戳、数据中心 ID、节点 ID、序列号等信息，确保了全局唯一性和有序性。
