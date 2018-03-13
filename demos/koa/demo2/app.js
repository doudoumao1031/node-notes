// 导入的是一个类
const Koa = require('koa');

const app = new Koa();

// 参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是koa传入的将要处理的下一个异步函数。
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log('demo2 app started at port 3000!');