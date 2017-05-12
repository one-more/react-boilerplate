import {BAD_REQUEST, SERVER_ERROR} from '../../app/api';

export function processApiResponse(apiResponse) {
    const {status, body, headers} = apiResponse;
    const response = JSON.stringify(body);
    if (response.error) {
        return {status: BAD_REQUEST, response: response.error, headers};
    }
    return {status, response: body, headers};
}

export function serverError(message) {
    return {status: SERVER_ERROR, response: message};
}
