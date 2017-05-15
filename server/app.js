// @flow

/* eslint no-console: 0 */

import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import send from 'koa-send'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import middleware from './middleware'
import {PORT} from './data/constants'


const app = new Koa();
const api = new Router({
    prefix: '/api'
});

api.use(convert(bodyParser()));

app
    .use(api.routes())
    .use(api.allowedMethods())
    .use(logger());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = {message: err.message};
        ctx.status = err.status || 500;
    }
});

const dist = path.join(__dirname, '..', 'dist');

// serves static files
app.use(convert(serve(dist)));

// redirects to index.html any request that isn't handled by other middleware
app.use(async (ctx) => {
    await send(ctx, 'index.html', {root: dist});
});

app.use(middleware());
app.listen(PORT);

console.log(`Server running on port: ${PORT}`);
