
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