# 先锋网络中心

东北大学先锋网络中心介绍页&招新报名页面！

## 开发指南

### 安装

```
yarn install
```

### 调试

```
yarn run dev
```

### 组建

```
yarn run build
```

### 目录

```
.
├── node_modules
├── package.json
├── public
│   ├── dist
│   │   └── bundle.e47e84525136281a3187.js
│   ├── img
│   │   ├── background.79d902a3fa19f9b8b7d44aa8d999a13f.png
│   │   └── frontground.c735102255958d5ccf031f20038c0d7f.gif
│   ├── index.html
│   └── static
│       └── hello.487deb0527aa4445bfa958e3dd999279.md
├── README.md
├── src
│   ├── img
│   │   ├── background.png
│   │   └── frontground.gif
│   ├── js
│   │   └── index.js
│   ├── main.js
│   ├── md
│   │   └── hello.md
│   ├── scss
│   │   └── index.scss
│   └── tmpl
│       └── index.html
├── webpack.config.js
└── yarn.lock

```

+ JS文件请放在 src/js 目录下，SCSS 文件请放在 src/scss 目录下，HTML 文件请放在 src/tmpl 目录下，MARKDOWN 文件请放在 src/md 目录下。
+ SCSS 完全兼容 CSS 语法，请将所有样式表文件命名为 .scss 后缀。请充分按照模块化的原则创作 CSS 类。
+ 请使用 ECMAScript6 的风格和 API 编写 JS 文件。请充分按照模块化的原则创作 JS 模块。
+ 编译时，Webpack 自动打包生成 public 下的内容。
+ 要添加 CSS、JS、MARKDOWN，请在 src/main.js 中 import。要添加 HTML 文件，请在 webpack.config.js 中加入如下代码块
```
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: __dirname + "/src/tmpl/index.html"
    }),
```
