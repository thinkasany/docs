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

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    // 测试是否有一个失败就失败
    res(3);
    // rej(3);
  }, 3000);
});

// 在这里实现all2

Promise.all([p1, p2, p3]).then(res => {
  console.log('all', res);
});
Promise.all2([p1, p2, p3]).then(res => {
  console.log('all2', res);
});
