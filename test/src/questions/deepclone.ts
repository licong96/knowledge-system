
function isType(obj: Object | Array<any>, type: string) {
	if (typeof obj !== 'object') return false;

	const typeStr = Object.prototype.toString.call(obj);

	switch(type) {
		case 'Object':
			return (typeStr === '[object Object]');
		case 'Array':
			return (typeStr === '[object Array]');
		default:
			return false;
	}
}

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
type Parent = any;

// function deepclone(parent: Parent) {
// 	// 维护两个储存循环引用的数组
// 	// const parents: Array<any> = [];
// 	// const children: Array<any> = [];

// 	const _clone = (parent: Parent) => {
// 	  if (parent === null) return null;
// 	  if (typeof parent !== 'object') return parent;
  
// 	  let child, proto;
  
// 	  if (isType(parent, 'Array')) {
// 		// 对数组做特殊处理
// 		child = [];
// 	  } else {
// 		// 处理对象原型
// 		proto = Object.getPrototypeOf(parent);
// 		// 利用Object.create切断原型链
// 		child = Object.create(proto);
// 	  }
  
// 	  // 处理循环引用
// 	//   const index = parents.indexOf(parent);
// 	//   if (index !== -1) {
// 	// 	// 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
// 	// 	return children[index];
// 	//   }
// 	//   parents.push(parent);
// 	//   children.push(child);
  
// 	  for (let i in parent) {
// 		// 递归
// 		child[i] = _clone(parent[i]);
// 	  }
  
// 	  return child;
// 	};
// 	return _clone(parent);
// };

function deepclone(parent: Parent) {
	const _clone = (parent: Parent) => {
		if (typeof parent !== 'object') return parent;

		let child;

		if (isType(parent, 'Object')) {
			child = Object.create(Object.getPrototypeOf(parent));
		} else if (isType(parent, 'Array')) {
			child = [];
		}

		for (let i in parent) {
			child[i] = _clone(parent[i]);
		}

		return child;
	}
	return _clone(parent);
}


export default deepclone;