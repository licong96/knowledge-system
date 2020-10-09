interface IEventBus {
	events: any;
}

class EventBus implements IEventBus {
	events: any;
	constructor() {
		this.events = this.events || new Map();
	}

	addListener(type: string, fn: Function) {
		const handle = this.events.get(type);
		if (handle) {
			if (Array.isArray(handle)) {
				this.events.set(type, [...handle, fn]);
			} else {
				this.events.set(type, [handle, fn]);
			}
		} else {
			this.events.set(type, fn);
		}
	}

	removeListener(type: string, fn: Function) {
		const handle = this.events.get(type);

		if (!handle) return;
		if (Array.isArray(handle)) {
			const newHandle = [];
			for (let i = 0; i < handle.length; i++) {
				if (handle[i] !== fn) {
					newHandle.push(handle[i]);
				}
			}
			this.events.set(type, newHandle);
		} else {
			this.events.delete(type);
		}
	}

	emit(type: string, ...arg: any) {
		const handle = this.events.get(type);
		if (!handle) {
			console.error('no');
			return;
		}
		if (Array.isArray(handle)) {
			for (let i = 0; i < handle.length; i++) {
				handle[i].apply(this, arg);
			}
		} else {
			handle.apply(this, arg)
		}
	}
}


export default EventBus;