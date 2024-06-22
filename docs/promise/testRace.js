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

// const p3 = Promise.reject(3)

const p4 = new Promise((res, rej) => {
  setTimeout(() => {
    rej(4);
  }, 3000);
});

Promise.race([p1, p2, p4]).then(res => {
  console.log(res);
});

// 在这里实现promise.race2

Promise.race2([p1, p2, p4]).then(res => {
  console.log(res);
});
