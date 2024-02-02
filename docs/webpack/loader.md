# loader 的执行过程

## loader 类型

- pre loader
- normal loader
- post loader

loader 对执行顺序是有要求的，可以通过enforce配置

<img src="/docs/webpack/img/loader/1.png" style="width: 500px" />

## 的执行过程

loader 的结构 - loader-runner

<img src="/docs/webpack/img/loader/2.png" style="width: 500px" />

## loader 的执行顺序

如果pitch2执行出现问题，会直接熔断执行loader2再到loader1，loader3，4就不再执行了

<img src="/docs/webpack/img/loader/3.png" style="width: 500px" />

# 如何开发loader

## 本地调试

```js
  resolveLoader: {
    alias: {
      'loader1': path.resolve(__dirname, './loader/loader1')
    }
  },
   module: {
    // 自定义loader
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'loader1',
          options: {
            name: 'loader1'
          }
        }, "style-loader", "css-loader"] // MiniCssExtractPlugin是将css抽出文件的，会和style-loader冲突
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
```

## 写loader

- remainingRequest： 还没有执行的loader
- previousRequest：已经执行的loader

```js
function loader(source) {
  return source;
}

loader.pitch = function (remainingRequest, previousRequest, data) {};

module.exports = loader;
```

## 实现style-loader的完整代码

```js
const { stringifyRequest } = require('loader-utils');
function loader(source) {
  console.log('source', source);
  return source;
}

loader.pitch = function (remainingRequest, previousRequest, data) {
  const modulePath = stringifyRequest(this, `!!${remainingRequest}`);
  const options = this.getOptions();
  return `
    var element = document.createElement('style');
    const attributes = ${JSON.stringify(options.attributes || {})};
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    var content = require(${modulePath});
    content = content.__esModule ? content.default : content;
    element.innerHTML = content;
    const parentEle = document.querySelector('head');
    parentEle.appendChild(element);
    `;
};

module.exports = loader;
```
