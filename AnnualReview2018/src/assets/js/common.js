// 公用js
import '../less/index.less';
import 'babel-polyfill';

window.requestAnimationFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	}
 
window.cancelAnimationFrame = window.cancelAnimationFrame ||
	Window.webkitCancelAnimationFrame ||
	window.mozCancelAnimationFrame ||
	window.msCancelAnimationFrame ||
	window.oCancelAnimationFrame ||
	function(id){
		window.clearTimeout(id);
	}