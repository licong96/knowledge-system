
var isValid = function(s) {
    const store = ['(', ')', '{', '}', '[', ']'];
    const arr = s.split('');
    const stack = [];

    for (let i = 0; i < arr.length; i++) {
		const index = store.indexOf(arr[i]);
        if (index % 2 === 1 && store[index - 1] === stack[stack.length - 1]) {
            stack.pop();
        } else {
            arr[i] && stack.push(arr[i]);
        }
    }

    return !stack.length;
};

isValid('([)]');