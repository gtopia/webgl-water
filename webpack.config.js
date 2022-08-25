"use strict";
let path = require("path");
let srcDir = path.resolve(process.cwd(), 'pages');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoprefixer = require('autoprefixer');
let postcssOpacity = require('postcss-opacity');
let colorRgbaFallback = require("postcss-color-rgba-fallback");
let entryHandler = require('./webpack-cfg/entry-handler.js');
let htmlPluginHandler = require('./webpack-cfg/html-plugins-handler.js');
let getDevServerConfig = require('./webpack-cfg/dev-server.js');
const dev = 'development';
const prod = 'production';
const config = require('./config.js');
let mode = process.env.NODE_ENV.trim();
let entryObj = entryHandler.scanEntry(srcDir);
let htmlPlugins = htmlPluginHandler(srcDir, entryObj);
let getPlugins = require('./webpack-cfg/plugins.js');

let cssName = !config.md5 ? 'css/[name].css' : 'css/[name]-[contenthash:6].css';
let moduleConfig = require('./webpack-cfg/module.js');
let cssExtractTextPlugin = new ExtractTextPlugin(cssName, {
  disable: false,
  allChunks: false //不将所有的文件都打包到一起
});
//雪碧图生成的快捷路径
let spriteAlias = (() => {
  let obj = {};
  config.sprites.forEach((item) => {
    obj[item.name] = path.join(__dirname, 'pages', 'img', item.name + '-sprite.png')
  });
  return obj;
})();

module.exports = {
  devtool: dev === mode ? '#source-map' : null,
  context: path.join(__dirname, 'pages', 'js', 'page'),
  entry: Object.assign(entryHandler.transform(dev === mode, entryObj), {
    'vendor': ['es5-shim', 'es5-sham']
  }),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: mode === prod ? config.onLinePublicPath : config.publicPath,
    chunkFilename: config.md5 ? "js/[name]-chunk-[" + config.md5 + ":6].js" : "js/[name]-chunk.js",
    filename: config.md5 ? "js/[name]-[" + config.md5 + ":6].js" : "js/[name].js"
  },
  resolve: {
    root: [path.join(__dirname, 'pages')],
    extensions: ['', '.js', '.tpl', '.css', '.scss'],
    modulesDirectories: ['tpl', 'css', 'components', 'scss', 'node_modules'],
    alias: Object.assign({
      'es5-shim': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-shim.min.js'),
      'es5-sham': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-sham.min.js'),
    }, spriteAlias)
  },
  module: moduleConfig(mode !== prod, cssExtractTextPlugin),
  devServer: getDevServerConfig(mode === dev),
  plugins: getPlugins(mode, htmlPlugins, cssExtractTextPlugin),
  // postcss配置
  postcss: () => {
    return [
      //为ie浏览器添加opactity filter
      postcssOpacity(),
      //自动添加前缀
      autoprefixer({
        browsers: ['>1%']
      }),
      //将rgba转化成对应ie浏览器也能解析的filter
      colorRgbaFallback({
        oldie: true
      })
    ];
  }
};
