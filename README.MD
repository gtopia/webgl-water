# WebGL Water
### Interactions
+ Draw on the water to make ripples
+ Drag the background to rotate the camera
+ Press SPACEBAR to pause and unpause
+ Drag the sphere to move it around
+ Press the L key to set the light direction
+ Press the G key to toggle gravity  

### Features
1. Raytraced reflections and refractions
2. Analytic ambient occlusion
3. Heightfield water simulation *
4. Soft shadows  
___* requires the [OES_texture_float](https://developer.mozilla.org/zh-CN/docs/Web/API/OES_texture_float) extension___

# Install
### CNPM
```
$ npm install cnpm -g --registry=https://registry.npm.taobao.org
```
### Dependencies
```
$ cnpm install
$ cnpm install cross-env -g
$ cnpm install http-server -g
$ cnpm install webpack-dashboard -g
$ cnpm install webpack-dev-server -g
$ cnpm install webpack@1.13.0 -g
```

# Run
### Non-ie env
```
$ npm run dev-build
```
### IE env
```
$ npm run dev-ie-build
$ npm run dev-ie-server
```
### Online
```
$ npm run build
```
