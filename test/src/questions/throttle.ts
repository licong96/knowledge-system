
// function throttle(fn: Function, awit: number) {
// 	let off = true;
// 	let time = null as any;
// 	return (...arg: any) => {
// 		if (!off) return;
// 		off = false;
// 		time = setTimeout(() => {
// 			fn.apply(this, arg);
// 			off = true;
// 			clearTimeout(time);
// 		}, awit);
// 	}
// }


function throttle(fn: Function, awit: number) {
	let pre = +new Date();
	return (...arg: any) => {
		const now = +new Date();
		if (now - pre > awit) {
			fn.apply(this, arg);
			pre = now;
		}
	}
}


export default throttle;