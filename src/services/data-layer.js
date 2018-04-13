import {busMiddleware, backendAction} from 'falx-bus'
import {use, register, store} from 'falx'
import Transport from './transport'

const testReducer = {
    state: 0,
    actions: {
        testBus: backendAction()
    }
};

const TRANSPORT = "transport";

const expectedState = 1;

export default {
    init(testBus: boolean): void {
        use(
            busMiddleware(Transport)
        );
        if (testBus) {
            register(TRANSPORT, testReducer);
            this.sendTestAction()
        }
    },

    sendTestAction() {
        store.transport.testBus(expectedState).then(() => {
            if(store.getState().transport === expectedState) {
                console.info('falx bus trasnport works fine')
            } else {
                console.error('falx bus transport does not work')
            }
        });
    }
}
