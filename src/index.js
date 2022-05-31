const PromiseState = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
};

class MyPromise {
  constructor(executor) {
    this.state = PromiseState.PENDING;
    this.result = undefined;
    this.onFulfilledFn = [];
    this.onRejectedFn = [];

    const resolve = (value) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.FULFILLED;
        this.result = value;
        console.log(3, value);
        this.onFulfilledFn.forEach((fn) => fn(value));
      }
    };

    const reject = (error) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.REJECTED;
        this.result = error;
        this.onRejectedFn.forEach((fn) => fn(error));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then = (onFulfilled, onRejected) => {
    if (this.state === PromiseState.PENDING) {
      if (onFulfilled) {
        this.onFulfilledFn.push(onFulfilled);
        return;
      }
      if (onRejected) {
        this.onRejectedFn.push(onRejected);
        return;
      }
    }

    if (onFulfilled && this.state === PromiseState.FULFILLED) {
      onFulfilled(this.result);
      return;
    }

    if (onRejected && this.state === PromiseState.REJECTED) {
      onRejected(this.error);
    }
  };
}

console.log('FIRST PROMISE INSTANCE');
console.log(1);
const firstPromise = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => console.log('Executes after all syncronous code:', 5), 0);
  resolve('success');
  resolve('unexecuted code');
});
console.log(4);


const secondPromise = new MyPromise((resolve, reject) => {
  console.log('SECOND PROMISE INSTANCE');
  setTimeout(() => reject('error'), 1000);
});

setTimeout(
    () => console.log('Asyncronous 2-nd promise check:', secondPromise),
    1500,
);
console.log('Syncronous 2-nd promise check:', secondPromise);


const thirdPromise = new MyPromise((resolve, reject) => {
  console.log('THIRD PROMISE INSTANCE');
  setTimeout(() => resolve('success to then'), 2000);
}).then((value) => {
  console.log(value);
});
