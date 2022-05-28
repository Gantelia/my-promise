import { PromiseState } from "./const";

class MyPromise {
    constructor(executor) {
        this.state = PromiseState.PENDING;
        this.result = undefined;

        const resolve = (value) => {};

        const reject = (error) => {};
    }
}