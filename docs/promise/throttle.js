// 节流函数
function throttle(func, delay) {
  let last = 0;

  return (...args) => {
    const now = new Date().getTime();
    if (now - last >= delay) {
      func.apply(this, args);
      last = now;
    }
  };
}
