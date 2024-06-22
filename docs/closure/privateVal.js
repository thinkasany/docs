// 保护私有变量

const privateVal = () => {
  let count = 0;
  return () => {
    count++;
    console.log(count);
  };
};

const fn = privateVal();
fn();
fn();
