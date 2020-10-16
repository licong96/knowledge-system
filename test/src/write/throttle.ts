/**
 * 节流
 * 动作绑定事件，动作发生后一段时间后触发事件，在这段时间内，如果动作又发生，则无视该动作，直到事件执行完后，才能重新触发。
 */
// 时间版本，立即执行，立即停止
// export default function throttle(fn: Function, wait: number) {
// 	let prevTime = +new Date();
// 	return function (...args: any) {
// 		const now = +new Date();
// 		if (now - prevTime > wait) {
// 			fn.apply(this, args);
// 			prevTime = now;
// 		}
// 	}
// }

// 定时器版本，延迟执行，延迟停止
// export default function throttle(fn: Function, wait: number) {
// 	let time = null as any;
// 	return function (...args: any) {
// 		if (!time) {
// 			time = setTimeout(() => {
// 				fn.apply(this, args);
// 				time = null;
// 			}, wait);
// 		}
// 	}
// }

// 合并版本，立即执行，延迟停止
export default function throttle(fn: Function, wait: number) {
	let time = null as any;
	let prevTime = 0;

	return function (...args: any) {
		const now = +new Date();
		const remaining = wait - (now - prevTime);

		if (remaining <= 0 || remaining > wait) {
            if (time) {
                clearTimeout(time);
                time = null;
            }
            prevTime = now;
			fn.apply(this, args);
		} else if (!time) {
            time = setTimeout(() => {
				prevTime = +new Date();
				time = null;
				fn.apply(this, args)
			}, remaining);
        }
	}
}

document.body.addEventListener('mousemove', throttle(function(e: Event) {
	console.log(this, e)
}, 1000));