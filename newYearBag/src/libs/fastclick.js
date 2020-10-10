import fastClick from 'fastclick'

// 解决移动端300ms点击延迟
window.addEventListener('load', () => {
  fastClick.attach(document.body)
})