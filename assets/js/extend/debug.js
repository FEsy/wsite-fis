/*
	在线地址：http://binnng.github.io/debug.js/demo/index.html
	使用方式：
	debug.success("This is success message:)");
	debug.error("This is error message:)");
	debug.log("This is primary message:)");
	debug.log({a: 1, b: 2});
	debug.log([1,2,3]);
	debug.guai() 关闭
*/



var __bind = function(a, b) {
		return function() {
			return a.apply(b, arguments)
		}
	};
(function(d, e) {
	"use strict";
	var f, DANGER, Debug, ERROR, LOG, NULL, SUCCESS, UNDEFINED, WARN, bind, dom, entry, errListener, exports, getBody, isArray, isNull, isObejct, isTouch, noop, toString, unbind;
	UNDEFINED = void 0;
	NULL = null;
	LOG = "log";
	DANGER = "danger";
	WARN = "warn";
	SUCCESS = "success";
	ERROR = "error";
	f = "click";
	isTouch = "ontouchend" in d;
	noop = function() {};
	dom = e.querySelectorAll;
	toString = {}.toString;
	bind = function(a, b, c) {
		return a.addEventListener(b, c, false)
	};
	unbind = function(a, b, c) {
		return a.removeEventListener(b, c, false)
	};
	isNull = function(a) {
		return a === NULL
	};
	isArray = Array.isArray ||
	function(a) {
		return a && "[object Array]" === toString.call(a)
	};
	isObejct = function(a) {
		return typeof a === "object" && !isArray(a) && !isNull(a)
	};
	getBody = function() {
		var a, _ref1;
		return e["body"] || ((a = dom("body")) != null ? a[0] : void 0) || ((_ref1 = dom("html")) != null ? _ref1[0] : void 0)
	};
	Debug = function() {
		var c, debugMap, fn, joinCss, parentBottom, parentCss, publicCss, render, translate;
		debugMap = {
			log: "0074cc",
			danger: "da4f49",
			warn: "faa732",
			success: "5bb75b",
			error: "bd362f"
		};
		render = function(a) {
			var b, item, text, _i, _len;
			text = "";
			b = [];
			if (isArray(a)) {
				for (_i = 0, _len = a.length; _i < _len; _i++) {
					item = a[_i];
					b.push("" + item)
				}
				text = "[" + b.join(",") + "]"
			} else if (isObejct(a)) {
				for (item in a) {
					b.push("" + item + ": " + a[item])
				}
				text = "{" + b.join(",") + "}"
			} else {
				text = String(a)
			}
			return text
		};
		translate = function(a, y) {
			a.style.webkitTransform = "translate3d(0," + y + ",0)";
			return a.style.transform = "translate3d(0," + y + ",0)"
		};
		joinCss = function(a) {
			return a.join(";")
		};
		parentBottom = 6;
		publicCss = ["-webkit-transition: all .3s ease", "transition: all .3s ease"];
		c = ["margin-top:-1px", "padding:.5em", "border-top:1px solid rgba(255,255,255,.1)", "margin:0"].concat(publicCss);
		parentCss = ["-webkit-overflow-scrolling:touch", "overflow:auto", "line-height:1.5", "z-index:5000", "position:fixed", "left:0", "top:0", "font-size:11px", "background:rgba(0,0,0,.8)", "color:#fff", "width:100%", "padding-bottom:" + parentBottom + "px"].concat(publicCss);

		function Debug() {
			this.toggle = __bind(this.toggle, this);
			this.isInit = this.isHide = false;
			this.msg = this.fn = this.color = "";
			this.el = NULL
		}
		Debug.prototype.init = function() {
			var b, el;
			el = this.el = e.createElement("div");
			el.setAttribute("style", joinCss(parentCss));
			b = getBody();
			b.appendChild(el);
			translate(el, 0);
			bind(el, f, function(a) {
				return function() {
					return a.toggle()
				}
			}(this));
			this.isInit = true;
			return this
		};
		Debug.prototype.print = function() {
			var a, css;
			if (!this.isInit) {
				this.init()
			}
			css = c.concat(["color:#" + this.color]);
			a = e.createElement("p");
			a.setAttribute("style", joinCss(css));
			a.innerHTML = this.msg;
			this.el.appendChild(a);
			return this
		};
		Debug.prototype.toggle = function(a) {
			return (this.isHide ? this.show : this.hide).call(this, a)
		};
		Debug.prototype.show = function(a) {
			translate(this.el, 0);
			this.isHide = false;
			return this
		};
		Debug.prototype.hide = function(a) {
			translate(this.el, "-" + (this.el.offsetHeight - parentBottom) + "px");
			this.isHide = true;
			return this
		};
		for (fn in debugMap) {
			Debug.prototype[fn] = function(b) {
				return function(a) {
					this.fn = b;
					this.msg = render(a);
					this.color = debugMap[b];
					return this.print()
				}
			}(fn)
		}
		return Debug
	}();
	entry = new Debug;
	errListener = function(a) {
		var b;
		b = ["Error:", "filename: " + a.filename, "lineno: " + a.lineno, "message: " + a.message, "type: " + a.type];
		return entry.error(b.join("<br/>"))
	};
	bind(d, ERROR, errListener);
	entry.guai = function() {
		return unbind(d, ERROR, errListener)
	};
	if (typeof exports !== "undefined" && module.exports) {
		return module.exports = exports = entry
	} else if (typeof define === "function") {
		return define(function(a, b, c) {
			return c.exports = b = entry
		})
	} else if (typeof angular === "object") {
		return angular.module("binnng/debug", []).factory("$debug", function() {
			return entry
		})
	} else {
		return d["debug"] = entry
	}
})(window, document);