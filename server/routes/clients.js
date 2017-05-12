/* eslint-disable no-param-reassign, prefer-arrow-callback */
import Router from 'koa-router';
import {getClients} from '../api';

const clientsRoutes = new Router();

clientsRoutes.get('/', async function r(ctx) {
    const {status, response} = await getClients();
    ctx.body = response;
    ctx.status = status;
});

export default clientsRoutes;
