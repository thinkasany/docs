const arr = [];
for (let i = 1; i <= 18; i++) {
  arr.push(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          console.log(new Date().toLocaleString(), i);
          resolve();
        }, 1000);
      })
  );
}

const parallelRun = () => {
  const runingTask = new Map();
  const inqueue = (totalTask, max) => {
    while (runingTask.size < max && totalTask.length) {
      const newTask = totalTask.shift();
      const tempName = totalTask.length;
      runingTask.set(tempName, newTask);
      newTask().finally(() => {
        runingTask.delete(tempName);
        inqueue(totalTask, max);
      });
    }
  };
  return inqueue;
};

parallelRun()(arr, 3);
