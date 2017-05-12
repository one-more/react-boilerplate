/* eslint-disable quote-props */
import urlBuider from 'url';
import {get, post} from '../utils/request';
import * as C from './urls';
import {processApiResponse, serverError} from '../utils/response';

/**
 * @param {String} search — search part of url
 * @returns {Promise.<*>}
 */
export async function getPayments(search) {
    const url = buildPaymenstUrl(search);

    try {
        const response = await get(url);
        return processApiResponse(response);
    } catch (err) {
        return serverError((err && err.message) || err);
    }
}

export async function editPayment(data) {
    const url = buildPaymenstUrl();
    try {
        const response = await post(url, data);
        return processApiResponse(response);
    } catch (err) {
        return serverError((err && err.message) || err);
    }
}

/**
 * @param {String} search
 * @returns {String}
 */
function buildPaymenstUrl(search = null) {
    return urlBuider.format({
        protocol: C.API_PROTOCOL,
        host: C.API_HOST,
        pathname: C.API_GET_PAYMENTS,
        search
    });
}
