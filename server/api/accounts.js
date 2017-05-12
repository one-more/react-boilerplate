/* eslint-disable quote-props */
import urlBuider from 'url';
import {post} from '../utils/request';
import * as C from './urls';
import {processApiResponse, serverError} from '../utils/response';

export async function postAccounts(data) {
    const url = buildAccountsUrl();
    try {
        const response = await post(url, data);
        return processApiResponse(response);
    } catch (err) {
        return serverError((err && err.message) || err);
    }
}

function buildAccountsUrl() {
    return urlBuider.format({
        protocol: C.API_PROTOCOL,
        host: C.API_HOST,
        pathname: C.API_POST_ACCOUNTS
    });
}
