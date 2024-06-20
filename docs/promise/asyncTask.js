const taskFn = fn => () => new Promise(resolve => {
    fn(resolve)
})


    
const task01 = taskFn(async (resolve) => {
    setTimeout(() => {
        console.log("01");
        resolve();
      }, 2000);
});

const task02 = taskFn(async (resolve) => {
    setTimeout(() => {
        console.log("02");
        resolve();
    }, 1000);
});

  (async () => {
    await task01();
    await task02();
  })();