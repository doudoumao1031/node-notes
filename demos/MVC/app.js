// Model-View-Controller，中文名“模型-视图-控制器”。

// 异步函数是C：Controller，Controller负责业务逻辑，比如检查用户名是否存在，取出用户信息等等；

// 包含变量{{ name }}的模板就是V：View，View负责显示逻辑，通过简单地替换一些变量，View最终输出的就是用户看到的HTML。

// MVC中的Model在哪？Model是用来传给View的，这样View在替换变量的时候，就可以从Model中取出相应的数据。

const isProduction = process.env.NODE_ENV === 'production';

app.use(async(ctx, next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var 
        start = new Date().getTime();
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.reponse.set('X-Response-Time', `${execTime}ms`);
});

// let staticFiles = require('./controllers/static-files');

// app.use(staticFiles('/static/',__dirname+'/static'));

// 这是因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。
if (! isProduction) {
    let staticFiles = require('./controllers/static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

// Node.js在全局变量process中定义了一个环境变量env.NODE_ENV，为什么要使用该环境变量？因为我们在开发的时候，环境变量应该设置为'development'，而部署到服务器时，环境变量应该设置为'production'。在编写代码的时候，要根据当前环境作不同的判断。
// 注意：生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。
app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());