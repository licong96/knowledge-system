
// function debounce(fn: Function, wait: number) {
// 	let time = null as any;
// 	return function(...arg: any) {
// 		if (time) clearTimeout(time);
// 		time = setTimeout(() => {
// 			fn.apply(this, arg);
// 		}, wait);
// 	}
// }

// 首次进入，执行一次
function debounce(fn: Function, wait: number) {
	let time = null as any;
	return function(...arg: any) {
		if (time === null) {
			fn.apply(this, arg);
		}
		if (time) clearTimeout(time);
		time = setTimeout(() => {
			fn.apply(this, arg);
		}, wait);
	}
}

export default debounce;