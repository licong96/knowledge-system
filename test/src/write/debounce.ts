/**
 * 防抖
 * 动作绑定事件，动作发生后一定时间后触发事件，在这段时间内，如果该动作又发生，则重新等待一定时间再触发事件。
 */
export default function debounce() {
	let time = null as any;
	// return function(...args: any) {
	// 	if (once) {
	// 		once = false;
	// 		fn.apply(this, args);
	// 		return;
	// 	}
	// 	if (time) {
	// 		clearTimeout(time);
	// 	}
	// 	time = setTimeout(() => {
	// 		fn.apply(this, args);
	// 	}, wait);
	// }

	function createDebounce(fn: Function, wait: number, once?: boolean) {
		return function (...args: any) {
			if (once) {
				once = false;
				fn.apply(this, args);
				return;
			}
			if (time) {
				clearTimeout(time);
			}
			time = setTimeout(() => {
				fn.apply(this, args);
			}, wait);
		}
	}

	function clearDebounce() {
		clearTimeout(time);
	}

	return {
		createDebounce,
		clearDebounce
	}
}


// document.body.addEventListener('mousemove', function(e) {
// 	console.log(this)
// 	console.log(e);
// });


// document.body.addEventListener('mousemove', debounce(function(e: Event) {
// 	console.log(this, e)
// }, 1000, true));

const { createDebounce, clearDebounce } = debounce();

document.body.addEventListener('mousemove', createDebounce(function(e: Event) {
	console.log(this, e)
}, 2000, true));

setTimeout(() => {
	clearDebounce();
}, 1500);