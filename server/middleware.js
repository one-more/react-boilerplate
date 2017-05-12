/* eslint-disable import/no-extraneous-dependencies */
import compose from 'koa-compose';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import cors from 'koa-cors';

export default function middleware() {
    return compose([
        helmet(),
        convert(cors())
    ]);
}
