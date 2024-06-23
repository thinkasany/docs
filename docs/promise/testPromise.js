// 这里编写promise2

const fn = () => {
  return new Promise2((reslove, reject) => {
    setTimeout(() => {
      console.log(1);
      reslove(2222);
    }, 1000);
  });
};

fn().then(res => {
  console.log(res);
});
