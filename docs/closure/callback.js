// 实现回调函数
const fetchData = (url, callback) => {
  setTimeout(() => {
    callback(`Data from ${url}`);
  }, 1000);
};

fetchData('https://www.google.com', data => {
  console.log(data);
});
