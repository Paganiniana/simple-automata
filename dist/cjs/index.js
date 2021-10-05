"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var Board=function(){function n(e,t){_classCallCheck(this,n),ent_color="rgba(0, 0, 0, 1)",this.game=e,this.canvas=t,this.canvas_height=t.height,this.canvas_width=t.width,this.setResizeListener(),this.setCanvasSize(),this.refresh()}return _createClass(n,[{key:"setCanvasSize",value:function(){var e=this.canvas.parentElement.getBoundingClientRect();this.canvas.width=e.width,this.canvas.height=e.height,this.canvas_height=this.canvas.height,this.canvas_width=this.canvas.width}},{key:"setResizeListener",value:function(){var e=this;window.addEventListener("resize",function(){e.setCanvasSize(),e.refresh()})}},{key:"refresh",value:function(){console.log("refreshing");var e=this.canvas.getContext("2d");e.fillStyle=this.ent_color;for(var t=this.canvas_width/this.game.getWidth(),n=0;n<this.game.getHeight();n++)for(var a=this.game.getRow(n),r=0;r<a.length;r++)a[r]&&(console.log("Printing row ".concat(n,", block ").concat(r)),e.fillRect(r*t,n*t,t,t))}}]),n}(),Game=function(){function r(e,t,n,a){if(_classCallCheck(this,r),this.ents=[],n.length!=e)throw new Error("Incompatible seed: the array 'start' must be of the same length as the width, ".concat(e,". You provided an array of length ").concat(n.length));if("number"!=typeof a||a<0||255<a)throw new Error("Incompatible ruleset. The ruleset must be an integer r, such that 0 <= r <= 255");if("number"!=typeof e||e<0)throw new Error("Incompatible width ".concat(e,". Width must be a number w, such that 0 < w."));if("number"!=typeof t||t<0)throw new Error("Incompatible height ".concat(t,". Width must be a number h, such that 0 < h."));this.w=e,this.h=t,this.ruleset=a.toString(2).padStart(8,"0"),this.ents.push(n),this.generate()}return _createClass(r,[{key:"generate",value:function(){for(var e=0;e<this.h;e++)this.generateNextRow()}},{key:"generateNextRow",value:function(){for(var e=this.ents[this.ents.length-1],t=new Array(this.w).fill(0),n=0;n<this.w;n++){var a=void 0,r=void 0,i=void 0,i=0==n?(a=e[e.length-1],r=e[n],e[n+1]):n==this.w-1?(a=e[n-1],r=e[n],e[0]):(a=e[n-1],r=e[n],e[n+1]),i=parseInt("".concat(a).concat(r).concat(i),2),i=this.ruleset[7-i];t[n]=parseInt(i)}this.ents.push(t)}},{key:"getRow",value:function(e){return this.ents[e]}},{key:"getWidth",value:function(){return this.w}},{key:"getHeight",value:function(){return this.h}}]),r}(),Automata=function(){function s(e,t,n,a){_classCallCheck(this,s);var r=document.getElementById(e);r.innerHTML="";var i,e=document.createElement("canvas");switch(r.appendChild(e),t){case"random":if(!a.hasOwnProperty("density")||"number"!=typeof a.density)throw new Error("To create a random seed, the number options.density must also be provided");i=this.getRandomRow(a.width,a.density);break;case"simple":i=this.getSimpleRow(a.width);break;case"interval":break;default:throw new Error("")}this.game=new Game(a.width,a.height,i,n),this.board=new Board(this.game,e)}return _createClass(s,[{key:"getRandomRow",value:function(e,t){if(1<t||t<0)throw new Error("The value density must be a decimal value d such that 0 < d < 1");for(var n=Array(e).fill(0),a=0;a<n.length;a++)Math.random()<t&&(n[a]=1);return n}},{key:"getSimpleRow",value:function(e){var t=Array(e).fill(0);return t[Math.floor(e/2)]=1,t}}]),s}();module.exports=Automata;