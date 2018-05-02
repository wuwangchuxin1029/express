//错误分两种情况：一、未注册  二、已注册
//应用级中间件(针对未注册过的路由)：无论是否注册过路由都会响应，路径可以省略不写，默认为‘/’
//错误处理中间件：针对已注册且有报错的路由
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('现在开始了');
})
app.get('/list', (req, res) => {
        main();
        res.send('list');
    })
    //访问的路径是未注册的路由时，可以通过应用级中间件=>友好返回一个错误提示（使用自定义状态码），能够让用户明白是什么错误
    // app.use((req, res) => {
    //     res.status(404).send('您访问的页面不存在');
    // });
    //错误处理中间件：针对已注册且有报错的路由
    // app.use((err, req, res, next) => {
    //     console.log(err.message);
    //     res.sendStatus(500);
    // });

//应用级中间件(针对未注册过的路由)：无论是否注册过路由都会响应，路径可以省略不写，默认为‘/’
app.use((req, res, next) => {
        //定义一个错误对象，由next方法传递给下一个错误处理中间件
        const err = new Error('出错了');
        //自定义响应状态码
        err.status = 404;
        next(err);

    })
    //错误处理中间件
app.use((err, req, res, next) => {
    console.log(err.message);
    console.log(err.status);
    res.status(err.status || 500).send(err.message);
    // res.status(500).send('页面跑丢了');
});
app.listen(8210);