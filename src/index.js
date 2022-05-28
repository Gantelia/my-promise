import { PromiseState } from "./const";

class MyPromise {
    constructor(executor) {
        this.state = PromiseState.PENDING;
        this.result = undefined;

        const resolve = (value) => {
            if (this.state === PromiseState.PENDING) {
                this.state = PromiseState.FULFILLED;
                this.result = value;
            }
        };

        const reject = (error) => {
            if (this.state === PromiseState.PENDING) {
                this.state = PromiseState.REJECTED;
                this.result = error;
            }
        };
    }
}