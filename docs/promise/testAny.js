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

Promise.any([p1, p2, p3])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

Promise.any([p3, p4])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// 在这里实现any2

Promise.any2([p1, p2, p3])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

Promise.any2([p3, p4])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
