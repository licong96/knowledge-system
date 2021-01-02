// 匹配器

test('matchres', () => {
    expect(1+1).toBe(2);

    const obj = { a: 1 };
    // 匹配内容
    expect(obj).toEqual({ a: 1 });

    expect(null).toBeNull();
})