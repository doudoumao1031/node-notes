// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname+'/controllers');

// 过滤出js文件
var js_files = files.filter((f) => {
    return f.endsWith('.js');
});

// 处理每个js文件
for(var f of js_files){
    console.log(`process controller: ${f}...`);
    // 导入js文件
    let mapping = require(__dirname + '/controllers/' + f);// 这儿抓的就是那个输出对象
    for (var url in mapping){
        if(url.startsWith('GET')){
            // 如果url类似"GET xxx": 即封装的GET处理
            var path = url.substring(4); // 取出处理的具体url
            router.get(path, mapping[url]); // 配置具体的处理映射
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST')){
            // 如果url类似"POST xxx": 即封装的POST处理
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else{
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}