/* eslint-disable no-param-reassign, prefer-arrow-callback */
import Router from 'koa-router';
import {postAccounts} from '../api';

const accountsRoutes = new Router();

accountsRoutes.post('/', async function r(ctx) {
    const data = ctx.request.body;
    const {status, response} = await postAccounts(data);
    ctx.body = response;
    ctx.status = status;
});

export default accountsRoutes;
