// @flow

import type {Action, State} from "../types";
import axios from 'axios'
import {BUS_URL, REGISTER_REDUCER_ACTION} from "../data/constants";
import prop from "ramda/es/prop";

export default {
    send(state: State, action: Action): Promise<State> {
        if (action.type !== REGISTER_REDUCER_ACTION) {
            return axios.post(BUS_URL, {state, action}).then(prop("data"))
        }
        return Promise.resolve(state)
    }
}
