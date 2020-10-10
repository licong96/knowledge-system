/**
 * 获取 cookie 具体某个值
 *
 * @export
 * @param { string } name
 * @returns
 */
export function getCookie(name) {
    let arr
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg)
    if (arr) {
        return decodeURIComponent(arr[2])
    }
    return null
}


/**
 * 设置 cookie
 * @param name cookie 名字
 * @param val cookie 值
 * @param day cookie 有效期
 */
export function setCookie(name, val, day = 30) {
    const now = new Date()
    now.setTime(now.getTime() + day * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${val};path=/;expires=${now.toUTCString()}`
}


/**
 * 根据cookie的键值移除cookie的值。
 * @param {string} name cookie键值
 * @return {string}
 */
export function removeCookie(name, path, domain) {
    setCookie(name, '', -1);  //调用上面的setCookie方法
}

/**
 * 清除所有cookie。
 */
export function clearCookies(path, domain) {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        document.cookie =
            cookie.trim() +
            (path ? ';path=' + path : '') +
            (domain ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    });
}