/* eslint-disable no-param-reassign, prefer-arrow-callback */
import Router from 'koa-router';
import {postStatement} from '../api';

const statementRoutes = new Router();

statementRoutes.post('/', async function r(ctx) {
    const data = ctx.request.body;
    const {status, response} = await postStatement(data);
    ctx.body = response;
    ctx.status = status;
});

export default statementRoutes;
