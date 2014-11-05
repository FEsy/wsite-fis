/*
  *使用方式
  var $progress = document.getElementById('progress')
    function loading(load) {
      var count = load.count
      var total = load.total
      $progress.innerHTML = Math.round(100*count/total) + '%'

      if(count === total) return complete()
    }
    var tasks = [
      'js/main.js',
      'img/bg.png',
      'img/el.png',
      'img/p2.png',
      'img/p3.png',
      'img/p4.png',
      'img/p5.png'
    ]
    new PreLoad(tasks, {
      onload: loading,
      version: '0.0.1'
    })
*/


var PreLoad=function(a,b){
      var c=b||{};
      this.source=a,
      this.count=0,
      this.total=a.length,
      this.onload=c.onload,
      this.prefix=c.prefix||"",
      this.version="?v="+(c.version||"0.0.1"),
      this.init()
}

PreLoad.prototype.init=function(){
      var a=this;
      a.source.forEach(
      function(b){
      var c=b.substr(b.lastIndexOf(".")+1).toLowerCase(),
          d=a.prefix+b+a.version;
          switch(c){
              case"js":
                a.script.call(a,d);
                break;
              case"css":
                a.stylesheet.call(a,d);
                  break;
              case"jpg":
              case"gif":
              case"png":
              case"jpeg":
              a.image.call(a,d)
            }
        })
},

PreLoad.prototype.getProgress=function(){
  return Math.floor(this.count/this.total*100)
},


PreLoad.prototype.image=function(a){
  var b=document.createElement("img");
  this.load(b,a),
  b.src=a
},

PreLoad.prototype.stylesheet=function(a){
  var b=document.createElement("link");
  this.load(b,a),
  b.rel="stylesheet",
  b.type="text/css",
  b.href=a,
  document.head.appendChild(b)
},

PreLoad.prototype.script=function(a){
  var b=document.createElement("script");
  this.load(b,a),
  b.type="text/javascript",
  b.src=a,document.head.appendChild(b)
},

PreLoad.prototype.load=function(a,b){
  var c=this;
  a.onload=a.onerror=a.onabort=function(a){
    c.onload&&c.onload({
      count:++c.count,
      total:c.total,
      item:b,
      type:a.type
    })
}

};
  




