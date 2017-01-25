'use strict';

module.exports = {
    publicPath: 'http://test.local.com.cn/', //已http或者https开头的绝对地址，绑定此域名到本地hosts
    onLinePublicPath: 'http://xxx/', //线上静态资源地址
    md5: 'chunkhash', //false：不加md5值；hash：全部资源公用一个hash；chunkhash：单文件一个hash值
    //雪碧图的配置
    sprites: [{
        //生成雪碧图的文件名字，该文件夹在pages下生成，eg: pages/sprite/normal,
        //有必要的话可以生成多个雪碧图的文件夹,后续生成scss的雪碧图映射文件与name
        //是一致的，同时也会在 img文件夹下面生成对应名字的png文件
        name: 'normal'
    }]
}
