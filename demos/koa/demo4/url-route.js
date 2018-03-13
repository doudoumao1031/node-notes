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

// add url-route
router.get('/hello/:name', async(ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body= `<h1>Hello, ${name}!</h1>`;
})
router.get('/', async(ctx,next)=>{
    ctx.response.body=`<h1>Index</h1>`;
});

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app demo4 started at port 3000...');