const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();


// 封装好的路由和业务
const controller = require('./controllers/controller');

app.use(bodyParser());

// 使用middleware
app.use(controller());

app.listen(3000);
console.log('app3 started at port 3000...');