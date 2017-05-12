/* eslint-disable import/no-extraneous-dependencies, no-param-reassign, prefer-arrow-callback, global-require */

// структура запроса
// public class PaymentFilter {
//     private Date dateStart;
//     private Date dateEnd;
//     private Date sendDateStart;
//     private Date sendDateEnd;
//     private Date processingDateStart;
//     private Date processingDateEnd;
//     private PaymentStatus[] status;
//     private BigDecimal amountStart;
//     private BigDecimal amountEnd;
//     private String[] payerAccount;
//     private String receiverAccount;
//     private String payerName;
//     private String receiverName;
//     private String receiverBankBic;
//     private String purpose;
//     private boolean budget;
//     private String numberStart;
//     private String numberEnd;
// }

import url from 'url';
import Router from 'koa-router';
import {getPayments, editPayment} from '../api';

const paymentsRoutes = new Router();

let getPaymentMiddleware;
let postPaymentMiddleware;

if (process.env.NODE_ENV === 'development') {
    const {paymentsResponse} = require('../mocks');
    const {OK} = require('../../app/api');

    getPaymentMiddleware = postPaymentMiddleware = async function r(ctx) {
        ctx.body = paymentsResponse;
        ctx.status = OK;
    };
} else {
    getPaymentMiddleware = async function r(ctx) {
        const {search} = url.parse(ctx.request.url);
        const {status, response} = await getPayments(search);
        ctx.body = response;
        ctx.status = status;
    };

    postPaymentMiddleware = async function r(ctx) {
        const paymentData = ctx.request.body;
        const {status, response} = await editPayment(paymentData);
        ctx.body = response;
        ctx.status = status;
    };
}

paymentsRoutes.get('/', getPaymentMiddleware);
paymentsRoutes.post('/', postPaymentMiddleware);

export default paymentsRoutes;
