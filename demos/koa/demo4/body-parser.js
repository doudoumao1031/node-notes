// 用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，
// 它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，
// 都不提供解析request的body的功能！

// 所以，我们又需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。

const Koa = require('koa');
const router = require('koa-router')();//本身返回的是函数

const bodyParser = require('koa-bodyparser');

const app = new Koa();

// log request URL
app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
// 然后就可以处理post请求了

// add url-route
router.get('/', async(ctx, next)=>{
    ctx.response.body =
    `<h1>Index</h1>
        <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app demo4 started at port 3000...');