import urlBuider from 'url';
import {post} from '../utils/request';
import * as C from './urls';
import {processApiResponse, serverError} from '../utils/response';

export async function postStatement(data) {
    const url = buildStatementUrl();

    try {
        const response = await post(url, data);
        return processApiResponse(response);
    } catch (err) {
        return serverError((err && err.message) || err);
    }
}

function buildStatementUrl() {
    return urlBuider.format({
        protocol: C.API_PROTOCOL,
        host: C.API_HOST,
        pathname: C.API_POST_STATEMENT
    });
}
