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
    return new MyPromise((resolve, reject) => {
      if (this.state === PromiseState.PENDING) {
        if (onFulfilled) {
          this.onFulfilledFn.push(() => {
            try {
              const newResult = onFulfilled(this.result);
              if (newResult instanceof MyPromise) {
                newResult.then(resolve, reject);
              } else {
                resolve(newResult);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
        if (onRejected) {
          this.onRejectedFn.push(() => {
            try {
              const newResult = onRejected(this.result);
              if (newResult instanceof MyPromise) {
                newResult.then(resolve, reject);
              } else {
                reject(newResult);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
        return;
      }

      if (onFulfilled && this.state === PromiseState.FULFILLED) {
        try {
          const newResult = onFulfilled(this.result);
          if (newResult instanceof MyPromise) {
            newResult.then(resolve, reject);
          } else {
            resolve(newResult);
          }
        } catch (error) {
          reject(error);
        }
        return;
      }

      if (onRejected && this.state === PromiseState.REJECTED) {
        try {
          const newResult = onRejected(this.result);
          if (newResult instanceof MyPromise) {
            newResult.then(resolve, reject);
          } else {
            reject(newResult);
          }
        } catch (error) {
          reject(error);
        }
        return;
      }
    });
  };

  catch = (onRejected) => {
    return this.then(null, onRejected);
  };
}

console.log('FIRST PROMISE INSTANCE: sync resolve');
console.log(1);
new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => console.log('Executes after all syncronous code:', 4), 0);
  resolve('success');
  resolve('unexecuted code');
});
console.log(3);


const secondPromise = new MyPromise((resolve, reject) => {
  console.log('SECOND PROMISE INSTANCE: checking promise result');
  setTimeout(() => reject('error'), 1000);
});

setTimeout(
    () => console.log('Asyncronous 2-nd promise check:', secondPromise),
    1500,
);
console.log('Syncronous 2-nd promise check:', secondPromise);


new MyPromise((resolve, reject) => {
  setTimeout(() => console.log('THIRD PROMISE INSTANCE: resolve + then'), 1800);
  setTimeout(() => resolve('success to then'), 2000);
}).then((value) => {
  console.log(value);
});


new MyPromise((resolve, reject) => {
  setTimeout(() => console.log('FOURTH PROMISE INSTANCE: reject + then'), 2200);
  setTimeout(() => reject(new Error('Oops!')), 2500);
}).then((value) => {
  console.log(value);
}, (error) => {
  console.log(error);
});

new MyPromise((resolve, reject) => {
  setTimeout(() => console.log('FIFTH PROMISE INSTANCE: catch'), 2600);
  setTimeout(() => reject(new Error('Something is wrong!')), 2700);
}).catch((error) => {
  console.log(error);
});

const sixthPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => console.log('SIXTH PROMISE INSTANCE: single promise'), 2800);
  setTimeout(() => resolve('ok'), 2900);
});

sixthPromise.then((value) => console.log('1st:', value));
sixthPromise.then((value) => console.log('2nd:', value));
sixthPromise.then((value) => console.log('3rd:', value));


new MyPromise((resolve, reject) => {
  setTimeout(() => console.log('SEVENTH PROMISE INSTANCE: then chain'), 3000);
  setTimeout(() => resolve('success'), 3100);
}).then((value) => {
  return value + ' first then';
}).then((value) => {
  return value + ' second then';
}).then((value) => {
  console.log(value);
});


new MyPromise((resolve, reject) => {
  setTimeout(() => console.log('EIHGTH INSTANCE: prom inside of prom'), 3200);
  setTimeout(() => resolve('success'), 3300);
}).then((value) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => resolve(value + ' new promise'), 0);
  });
}).then((value) => {
  console.log(value);
});
