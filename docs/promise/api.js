const p1 = new Promise(res => {
  setTimeout(() => {
    res(1);
  }, 2000);
});

const p2 = new Promise(res => {
  setTimeout(() => {
    res(2);
  }, 1000);
});

// p1().then(res=> {
//   console.log('res', res);
// })

// 只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且reject的是第一个抛出的错误信息
Promise.all2 = promises => {
  let arr = [],
    count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item)
        .then(res => {
          arr[i] = res;
          count++;
          if (count === promises.length) resolve(arr);
        })
        .catch(reject);
    });
  });
};
// const p3 = Promise.reject(3)

// Promise.all([p1, p2]).then(res=> {
//   console.log(res);
// })
// Promise.all2([p1, p2]).then(res=> {
//   console.log(res);
// })

// 以状态变化最快的那个 Promise 实例为准，最快的 Promise 成功 Promise.race 就成功，
// 最快的 Promise 失败 Promise.race 就失败。
Promise.race2 = promises => {
  return new Promise((resolve, reject) => {
    for (const item of promises) {
      Promise.resolve(item).then(resolve, reject);
    }
  });
};

// const p3 = Promise.reject(3)

// Promise.race([p1, p2]).then(res=> {
//   console.log(res);
// })

// Promise.race2([p1, p2]).then(res=> {
//   console.log(res);
// })

// Promise.race2([p1, p2, p3]).then(res=> {
//   console.log(res);
// })

// Promise.any 与 Promise.all 可以看做是相反的。Promise.any 中只要有一个 Promise 实例成功就成功，
// 只有当所有的 Promise 实例失败时 Promise.any 才失败，此时Promise.any 会把所有的失败/错误集合在一起，
// 返回一个失败的 promise 和AggregateError类型的实例。

// const p3 =  new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(3)
//   }, 3000);
// })

// const p4 =  new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(4)
//   }, 4000);
// })

Promise.any2 = promises => {
  let arr = [],
    count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(resolve, err => {
        if (err) {
          arr[i] = err;
        }
        count++;
        if (count === promises.length) reject(`[AggregateError: All promises were rejected], { [errors]: [${arr}] }`);
      });
    });
  });
};

// Promise.any([p1, p2, p3]).then(res=> {
//   console.log(res);
// }).catch(err=> {
//   console.log(err);
// })

// Promise.any([p3, p4]).then(res=> {
//   console.log(res);
// }).catch(err=> {
//   console.log(err);
// })

// Promise.any2([p1, p2, p3]).then(res=> {
//   console.log(res);
// }).catch(err=> {
//   console.log(err);
// })

// Promise.any2([p3, p4]).then(res=> {
//   console.log(res);
// }).catch(err=> {
//   console.log(err);
// })

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3);
  }, 3000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(4);
  }, 4000);
});

Promise.allSettled2 = promises => {
  let arr = [],
    count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(
        res => {
          arr[i] = { status: 'fufilled', value: res };
          if (count === promises.length) resolve(arr);
        },
        err => {
          arr[i] = { status: 'rejected', reason: err };
          if (count === promises.length) resolve(arr);
        }
      );
    });
  });
};

Promise.allSettled([p1, p2, p3, p4])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

Promise.allSettled2([p1, p2, p3, p4])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
