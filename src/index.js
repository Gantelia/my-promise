const PromiseState = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    FULFILLED: 'fulfilled',
}

class MyPromise {
    constructor(executor) {
        this.state = PromiseState.PENDING;
        this.result = undefined;

        const resolve = (value) => {
            if (this.state === PromiseState.PENDING) {
                this.state = PromiseState.FULFILLED;
                this.result = value;
                console.log(3);
            }
        };

        const reject = (error) => {
            if (this.state === PromiseState.PENDING) {
                this.state = PromiseState.REJECTED;
                this.result = error;
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    } 
}

console.log(1);
const promise = new MyPromise((resolve, reject) => {
    console.log(2);
    setTimeout(() => console.log(5), 0);
    resolve('success');
});
console.log(4);


console.log(promise);