## express -e . 输入后提示 command not found: express

先安装 全局安装 express 和 express-generator

然后输入 express -e .

## 执行 gulp 命令 提示 command not found: gulp

需全局安装 gulp

## 直接执行 gulp 命令 会优先查找 default.js,如果代码用 es6 编写 执行 gulp 时

## 会提示 Using gulpfile ~/Documents/demos/es6/gulpfile.babel.js

请先配置 gulpfile.babel.js

## Failed to load external module @babel/register;

降级 gulp 当前版本 到 3.9.0

## 上述条件达成后，调整 .babelrc 中的代码,并安装 babel-preset-es2015

{
'presets':['es2015']
}

## Cannot find module '@babel/core'

原因 "babel-loader": "^8.0.0" 版本问题。
使用 "babel-loader": "^7.1.5"即可解决该错误。

## webpack4 loaders 写法改变

rules:{
test:xxxx,
loader: 'babel-loader
}

## 如何运行

1.先用 clone 命令或者直接下载到本地 2.执行 npm install
3.gulp --watch 运行项目
