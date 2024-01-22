# loader 的执行过程

## loader 类型

- pre loader
- normal loader
- post loader

loader 对执行顺序是有要求的，可以通过enforce配置

<img src="/docs/webpack/img/loader/1.png" style="width: 500px" />

## loader 的结构 - loader-runner

<img src="/docs/webpack/img/loader/2.png" style="width: 500px" />

## loader 的执行顺序

如果pitch2执行出现问题，会直接熔断执行loader2再到loader1，loader3，4就不再执行了

<img src="/docs/webpack/img/loader/3.png" style="width: 500px" />
