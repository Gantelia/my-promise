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
                console.log(3, value);
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

console.log('FIRST PROMISE INSTANCE')
console.log(1);
const promise = new MyPromise((resolve, reject) => {
    console.log(2);
    setTimeout(() => console.log('Executes after all syncronous code:', 5), 0);
    resolve('success');
    resolve('unexecuted code');
});
console.log(4);



const rejectedPromise = new MyPromise((resolve, reject) => {
    console.log('SECOND PROMISE INSTANCE')
    setTimeout(() => reject('error'), 1000);
})

setTimeout(() => console.log('Asyncronous promise check:', rejectedPromise), 2000)
console.log('Syncronous promise check:', rejectedPromise);
