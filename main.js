//下载=>引入=>注册路由（app.method(path,(ck1,ck2)=>{res.send})）=>监听端口号
//引入模块
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const express = require('express'); //先下载express再引入
const app = express(); //实例化express

//注册路由
// app.get('/', (req, res) => {
//     res.end(fs.readFileSync(path.join(__dirname, './a.html')));
// });
// app.post('/menu', (req, res) => {
//     res.end('post request to homepage');
// });


//***ajax属于网络请求，所以数据会响应到Network而不是网页上
//一、响应get方式请求(将地址栏参数响应出来)
// app.get('/', (req, res) => {
//     res.end(fs.readFileSync(path.join(__dirname, './ajax.html')));
// })
// app.get('/list', (req, res) => {
//     //将地址栏参数响应出来
//     const src = url.parse(req.url).query;
//     res.end(querystring.parse(src).name);
// })


//二、响应post方式请求(将地址栏参数响应出来)
// app.get('/', (req, res) => {
//     res.end(fs.readFileSync(path.join(__dirname, './ajax.html')));
// })
// app.post('/list', (req, res) => {
//使用ondata和onend事件，将地址栏参数响应出来
//      let str = '';
//     req.on('data', chunk => {
//         str += chunk;
//     })
//     req.on('end', () => {
//             res.end(str);
//         })
// })

//app.all():一种特殊的路由方法，必须要有路径，按照顺序从上向下执行，跟请求方式无关，匹配的是请求路径
//next():将控制权交给下一个匹配的(同名的)路由，参数里必须要有next,函数体里要有next()，否则在没有结束响应的时候，服务器会一直挂起
// app.all('/list', (req, res, next) => {
//     // res.end('852963741');
//     console.log('852');
//     next();
// });
// app.post('/list', (req, res) => {
//     res.send('post request to homeage');
// });
// app.get('/list', (req, res) => {
//     res.send('get request to homeage');
// });
// app.get('/', (req, res) => {
//     res.end('get');
// });


//路由句柄：多种形式，可以是函数、函数体或者是两者混合

//函数体
// app.get('/a.html', (req, res, next) => {
//     console.log('1');
//     next();
// });
// const fn1 = (req, res, next) => {
//     console.log('2');
//     next()
// }
// const fn2 = (req, res, next) => {
//     console.log('3');
//     next()
// }
// const fn3 = (req, res, next) => {
//     console.log('4');
//     next()
// }
// const fn4 = (req, res, next) => {
//         console.log('5');
//         next()
//     }
//     //函数体与函数混合
// app.get('/a.html', [fn1, fn2, fn3, fn4], (req, res) => {
//     res.end('结束');
// })

//当处理器函数与同名路由同时存在时，(第一个处理器函数后紧跟着另一个处理器函数)处理器函数优先
// app.get('/a.html', (req, res, next) => {
//     console.log('85');
//     next();
// }, (req, res) => {
//     res.send('86');
// });
// app.get('/a.html', (req, res) => {
//     res.send('87');
// })

//next(route):添加route参数后，会直接将控制权交给下一个同名路由而不是紧邻的处理器函数(也就是当前路由的其它中间件（函数）)。
// app.get('/a.html', (req, res, next) => {
//     console.log('85');
//     next('route');
// }, (req, res) => {
//     res.send('86');
// });
// app.get('/a.html', (req, res) => {
//     res.send('87');
// })

//响应方式：
// res.download(要下载的文件名)
// res.end();结束响应流程
// res.json();发送一个json格式的响应
// res.jsonp();发送一个支持jsonp的json格式的响应
// res.send();发送各种类型的响应，不支持buffer格式
// res.sendFile():以八位字节流的形式发送文件，不用再使用fs来读取文件，但是文件的路径一定要使用path.resolve()转为绝对路径
//res.render():渲染视图模板
//res.redirect():重定向请求
//res.sendStatus():设置响应状态码，并将其以字符串的形式作为响应体的一部分发送
//res.status(400).send('页面不存在')：  自定义响应状态码


//res.redirect示例：既执行了a.html路由打印，也响应了ajax.html 路由
// app.get('/a.html', (req, res) => {
//     console.log('85');
//     res.redirect('ajax.html');
// });
// app.get('/ajax.html', (req, res) => {
//     res.send('重定向');
// })


//res.sendFile示例：
// app.get('/a.html', (req, res) => {
//     res.sendFile(path.resolve('a.html'))
// });

//链式路由句柄
app.route('/list')
    .get((req, res) => {
        res.sendFile(path.resolve('ajax.html'));
    })
    .get((req, res) => {
        res.send('post');
    })

app.listen(8880); //监听端口号