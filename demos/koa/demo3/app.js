// 导入的是一个类
const Koa = require('koa');

const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();//调用下一个middleware
});

app.use(async(ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
});

app.use(async(ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>hello doudoumao</h1>'
});

app.listen(3000);
console.log('demo3 app started at port 3000!');

// 如果一个middleware没有调用await next() 后续middleware将不再执行 如权限检测场景
// app.use(async(ctx, next) => {
//     if(await checkUserPermission(ctx)){
//         await next();
//     }else{
//         ctx.response.status=403;
//     }
// });