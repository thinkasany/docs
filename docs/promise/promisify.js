// https://juejin.cn/post/6850037281206566919?searchId=20240622234233FE118D978E32704FD76E#heading-14
const promisify = (fn = (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
});

const promisefyAll = target => {
  Reflect.ownKeys(target).forEach(key => {
    if (typeof key === 'function') {
      target[key + 'async'] = promisefy(target[key]);
    }
  });
  return target;
};
