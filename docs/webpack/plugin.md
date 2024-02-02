# plugin 的执行过程

- 初始化插件实例
- 调用apply，传入compiler
- 通过compiler自定义构建

## 可使用的钩子-compiler

- enrtyOption: 开始读取配置文件的entry，遍历入口文件
- run：准备开始构建
- compile：开始一次构建，准备创建compilation
- make：启动构建
- emit：打包完成，准备输出前执行
- done：输出完成，构建结束

## 可使用的钩子-compilation

- buildModule：模块构建前触发，可以修改模块参数
- seal：构建完成时触发
- optimize：优化开始时触发

# 如何实现一个plugin

> 目标：实现一个csp策略的插件
> <img src="/docs/webpack/img/plugin/1.png" style="width: 500px" />

## 实现效果

<img src="/docs/webpack/img/plugin/2.png" style="width: 500px" />

## 配置代码

```js
  const { CSPPlugin } = require("./plugin/test-plugin");
  plugins: [
    new CSPPlugin({
      "default-src": ["self", "www.a.com"]
    })
  ],
```

## 全部代码

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
function CSPPlugin(options) {
  this.options = options;
}
CSPPlugin.prototype.apply = function (compiler) {
  const setOptions = this.options;
  compiler.hooks.thisCompilation.tap('options', compilation => {
    HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('CSPPlugin', (data, cb) => {
      console.log(data.html);
      let cspContent = '';
      for (const key in setOptions) {
        cspContent += `${key} '${setOptions[key].join("' '")}'`;
      }
      let insertHtml = `<meta 
      http-equiv="Content=Security-Policy" content="${cspContent}" />"
      `;
      const index = data.html.indexOf('<head>');
      data.html = data.html.substring(0, index + 6) + insertHtml + data.html.substring(index + 6);
      console.log(data.html);
      cb(null, data);
    });
  });
};

module.exports = {
  CSPPlugin
};
```

<!--  -->
