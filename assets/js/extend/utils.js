var uitls = {

	testPhone : function(phone){
		var regPhone = /^[0-9]*$/;
		if(phone.length == 11 && regPhone.test(phone)){
			return true;
		}
		return false;
	}, 
	rootPath : function(){
		var path = location.protocol+"//"+location.host+location.pathname.replace(/[^\/]+$/,'');
		return path;
	},
	requestAnimationFrame : function(){
		return  window.requestAnimationFrame       || 
	            window.webkitRequestAnimationFrame || 
	            window.mozRequestAnimationFrame    || 
	            window.oRequestAnimationFrame      || 
	            window.msRequestAnimationFrame     || 
	            function( callback ){window.setTimeout(callback, 1000 / 60);};
	},
	captureMouse : function(element){
		var mouse = {x: 0, y: 0};
		element.addEventListener("mousemove",function(event){
			var x, y;
			if(event.pageX || event.pageY){
				x = event.pageX;
				y = event.pageY;
			}
			else{
				x = event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
				y = event.clientY + document.body.scrollTop + 
				document.documentElement.scrollTop;
			}
			x -= element.offsetLeft;
			y -= element.offsetTop;
			mouse.x = x;
			mouse.y = y;
		}, false)
	return mouse;
	}
}