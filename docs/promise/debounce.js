// bind创建一个新函数并绑定上下文，以后可以调用。我们还可以通过bind来实现柯里化。
// call在指定的上下文中立即调用函数，并传入参数。
// apply在指定的上下文中立即调用函数，并传入数组作为参数。

// 防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
