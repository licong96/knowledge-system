
/**
 * 在 url 中获取对应参数的值（如果参数里面有 '=' 号，就完蛋了）
 * @export
 * @param {String} variable 参数 key
 * @returns values || false
 */
export function getQueryVariable (variable) {
  const query = window.location.href.split('?')[1]
  if (query) {
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === variable) { return pair[1] }
    }
  }
  return false
}
  
/**
 * 返回页面参数字符串
 * @returns string
 */
export function locationHref() {
  const arrHref = window.location.href.split('?');

  return arrHref[arrHref.length - 1].replace(/#\//g, '');      // 防止hash路由出现的特殊情况，取最后一个问号后面的参数，因为微信分享会添加一个？号
}

/**
 * 获取返回地址
 */
export function locationHrefReturnUrl() {
  const url = window.location.href;

  return `?returnUrl=${encodeURIComponent(url.substr(0, url.indexOf('?')))}`
}

/**
 * 判断是否微信
 **/
const isTutorAbcPhone = () => {
  let ua = window.navigator.userAgent.toLowerCase().match(/tutorabc/i) || '';

  if (ua.toString() === 'tutorabc') {
    return true;
  } else {
    return false;
  }
}
export function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) || '';

  // 因为vipJrapp 的ua里面MicroMessenger这个值，所以需要提前判断是是否为TutorAbcapp
  if (isTutorAbcPhone()) {
    return false;
  }

  // 注意：match方法拿到的是数组，所以这里使用 == 隐式类型转换会使用 toString方法
  if (ua.toString() === 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

/**
 * 禁止页面默认滑动
 */
function preventDefaults(event) {
  event.preventDefault();
}
export function preventDefaultTouchMove() {
  document.body.addEventListener('touchmove', preventDefaults, {passive: false, capture: false});   // passive 参数不能省略，用来兼容ios和android
}
/**
 * 恢复页面滑动
 */
export function recoverDefaultTouchMove() {
  document.body.removeEventListener('touchmove', preventDefaults, {passive: false, capture: false});   // passive 参数不能省略，用来兼容ios和android
}

/**
 * 判断是否APP
 */
export function isApp() {
  if (navigator.userAgent.match(/vipjrphone/i) || navigator.userAgent.match(/vipjrphone_android/i)) {
      return true
  }
  return false;
}

/**
 * 生成区间随机数
 * @param {Number} start 开始值
 * @param {Number} end   结束值
 * @param {Number} point 需要保留几位小数点，10表示1位，100表示2位，1000表示3位
 * @returns {Number}
 */
export function random(start = 10, end = 10 * 10, point = 0) {
  let span = end - start;
  
  if (point === 0) {
    return parseInt(Math.random() * span + start, 10);
  } else {
    return Math.floor((Math.random() * span + start) * point) / point;
  }
}
