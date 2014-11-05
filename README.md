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
1. sass->css
rsd能够将异构语言转换为前端语言（Sass,coffeeScript,Jade,前端模板）通过命令直接转化为css,javascript,html
```
rsd release 
```
2. js,css,html压缩
```
rsd release --optimize  #简写 rsd release -o 
```

3. 文件监听以及浏览器自动刷新
```
rsd release #简写rsd release -wl  
```
###第四步：资源合并
资源的合并需要在fis-conf.js中配置

1. css,js合并

2. 图片合并

对于图片的合并，rsd已经内置[csssprites]，但是它只对合并后的css文件的图片处理，如果需要对某个单独的css文件
处理需要单独在fis-conf.js中配置
```
rsd -p 
```
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
```
rsd server start
```
```
rsd release -m
```

###发布代码
1.添加文件版本
本地开发时可以不加，因为每次md5之后会生成一个新的文件
```
rsd release --md5  #简写 rsd release -m

```

```
rsd release -m --dest ../output
```


