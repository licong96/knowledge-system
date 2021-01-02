import { fetchData1 } from './fetchData';

// test('test 异步请求', (done) => {
//     fetchData1((resolve) => {
//         console.log(resolve)
//         expect(resolve.data.short_name).toEqual("React App")
//         done();
//     })
// });

test('test 异步请求', () => {
    return fetchData1().then(res => {
        expect(res.data.short_name).toEqual("React App")
    })
});

