/* eslint-disable quote-props */
import urlBuider from 'url';
import {get} from '../utils/request';
import * as C from './urls';
import {processApiResponse, serverError} from '../utils/response';

export async function getClients() {
    const url = buildClientsUrl();
    try {
        const response = await get(url);
        return processApiResponse(response);
    } catch (err) {
        return serverError((err && err.message) || err);
    }
}

function buildClientsUrl() {
    return urlBuider.format({
        protocol: C.API_PROTOCOL,
        host: C.API_HOST,
        pathname: C.API_GET_CLIENTS
    });
}
