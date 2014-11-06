wsite-fis
=========

根据fis以及rsd构建自己的项目目录结构
###第一步：安装工具
rsd是基于fis而包装的简单命令行工具，而fis的安装需要[nodejs](http://nodejs.org/)环境的支持，
同时需要你熟悉一下[fis](http://fis.baidu.com)
使用nodejs的包管理器node来安装
```bash
npm install -g rsd
```
查看是否安装成功：显示fis标志则已安装成功
```base 
rsd -v
```
rsd更多命令可以查看帮助
```
rsd release --help #简写 rsd release -h;
```

###第二步：创建项目，根据项目的实际情况创建不同的文件目录结构
下面以php为主，前端为辅的微信官方目录为demo,下面的目录不是一成不变的，根据自己的需要增删改

```
project
	|-assets
		|-css
			|-lib
			|-widget
			|-core
			|-extend
		|-js
			|-lib
			|-extend
			|-widget
			|-core
		|-images
			|-ui
			|-resource
		|-audio
	|-model
		user-model.php
	|-view
		|-common
		index-view.php	
	index.php	
	fis-con.js  fis工具配置文件
```
###第三步：资源压缩

sass->css,coffeeScript->javascript,jade->html

rsd能够将异构语言转换为前端语言（Sass,coffeeScript,Jade,前端模板）通过命令直接转化为css,javascript,html
首先指定产出目录:
```
rsd release --dest path/to/output #简写 rsd release -d path/to/output
```
javascript,css,html文件压缩

```
rsd release --optimize  #简写 rsd release -o 
```

文件监听以及浏览器自动刷新

```
rsd release --watch --live #简写rsd release -wl  
```
###第四步：资源合并

资源的合并需要在fis-conf.js中配置

1.css,javascript文件合并

对于css,javascript合并,需要在fis-conf.js中配置pack,默认只会进行文件打包，不会对页面中的静态资源引用进行替换
我们可以通过引入后端静态资源管理来加载打包模块。不过也可以利用[fis-postpackager-simple](https://github.com/hefangshi/fis-postpackager-simple)插件，可以自动将页面中独立的资源引用替换为打包资源

2.背景图片合并

对于图片的合并，rsd已经内置[csssprites](https://github.com/fex-team/fis-spriter-csssprites)，但是它只对合并后的css文件的图片处理，如果需要对某个单独的css文件
处理需要单独在fis-conf.js中配置
```
rsd release --pack #简写rsd release -p 
```

参考一下fis-conf.js
```
fis.config.merge({
	settings : {
			postpackager : {
				simple : {
					autoReflow: true,
					//autoCombine: true
				}
			},
			spriter: {
				csssprites: {
					margin: 20
				}
			}
		},
    roadmap : {
	     	path: [
	   			//{
 				// 	reg: /\/assets\/css\/.*\.css$/i,
 				//     useSprite: true,
 				//},
 				{
 				    reg: /\/assets\/css\/(.*\.png)$/i,
 				    release: '/assets/images/$1',
				}
     	]
     },
	 modules: {
	    	postpackager : 'simple',
	    	spriter : 'csssprites'
	  },
     pack : {
      	'assets/js/lib.js': ['/assets/js/handlebars.js','/assets/js/jquery-1.8.2.js'],
      	'assets/css/lib.css' : ['/assets/css/**.css','/assets/css/**.scss'] 
      }
 });
```

###本地预览

本地安装 Apache、Nginx、Lighttpd、IIS等服务器，可以发布在服务器的根目录下，如D:\wwwroot

```bash
rsd release -md d:\wwwroot
```

rsd内置调试服务器

```bash
rsd server start
```
release命令如果省略 --dest <path>参数，就表示把代码发布到内置服务器的根目录下,如果不省略会是什么情况，还待搞定
```bash
rsd release -m
```

###代码部署

添加文件版本
本地开发时可以不加，因为每次md5之后会生成一个新的文件
```
rsd release --md5  #简写 rsd release -m
```

```
rsd release -m --dest ../output
```


