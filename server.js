var koa = require('koa');
var logger = require('koa-logger');
var responseTime = require('koa-response-time');
var serve = require('koa-static');

var app = koa();

app.use(responseTime());
app.use(logger());
app.use(serve(__dirname + '/images'));

app.use(function*(next) {
	this.body = `<h1>Agent Smith says:</h1>
	<h3>${this.req.headers['user-agent']}</h3>
	<img src="http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=https%3A%2F%2Fuseragent-smith.herokuapp.com%2F&amp;qzone=1&amp;margin=0&amp;size=248x248&amp;ecc=L" alt="qr code" />
	<img src="agent-smith.gif"/>
	`;
});

var port = process.env.PORT || 3001;
app.listen(port);

console.log(`Application started on port ${port}`);
