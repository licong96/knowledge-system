import { add } from './index';

// const result = add(1, 2);
// const target = 3;

// if (result !== target) {
//     throw Error('');
// }


// expect(add(1, 2)).toBe(3);

// function expect(result) {
//     return {
//         toBe: (actual) => {
//             if (result !== actual) {
//                 throw Error('');
//             }
//         }
//     }
// }


test('测试加法', () => {
    expect(add(1, 2)).toBe(3);
})

// function test(desc, func) {
//     try {
//         func();
//         console.log(desc, '测试通过');
//     } catch (e) {
//         console.error(desc, '测试不通过');
//     }
// }