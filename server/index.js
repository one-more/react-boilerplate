const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const backend = require('./backend');

const router = new Router();

router.post('/bus', async ctx => {
    const {state, action} = ctx.request.body;
    ctx.body = await backend(null, state, action)
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('started server on 3000 port')
});
