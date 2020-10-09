

// const obj = {
// 	a: 1
// }

// function run(arg: string) {
// 	console.log(arg);
// 	return this.a;
// }

// Function.prototype.myCall = function (c) {
//  const content = Object(c) || window; 
// 	content.fn = this;
// 	const args = [...arguments].slice(1);

// 	const result = content.fn(...args);
// 	delete content.fn;
// 	return result;
// }
  
// console.log(run.myCall(obj, '1'))

export default Function;

