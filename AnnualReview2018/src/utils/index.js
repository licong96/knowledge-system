
/**
 * 禁止微信分享
 */
export function forbidWeiXinShare () {
  function onBridgeReady() {
    window.WeixinJSBridge.call('hideOptionMenu');
  }
  if (typeof window.WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

/**
 * 禁止页面默认滑动
 */
export function preventDefaultTouchMove() {
  document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
  }, {passive: false});   // passive 参数不能省略，用来兼容ios和android


  let lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}


/**
 * 判断是否微信
 **/
const isTutorAbcPhone = () => {
  let ua = window.navigator.userAgent.toLowerCase();

  if (ua.match(/tutorabc/i) == 'tutorabc') {
    return true;
  } else {
    return false;
  }
}
export function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();

  // 因为vipJrapp 的ua里面MicroMessenger这个值，所以需要提前判断是是否为TutorAbcapp
  if (isTutorAbcPhone()) {
    return false;
  }

  // 注意：match方法拿到的是数组，所以这里使用 == 隐式类型转换会使用 toString方法
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
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