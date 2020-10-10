
var Handlebars = require('handlebars');

 /** 
 * 渲染 Handlebars 模板
 * @param { String } source   html模板
 * @param { Object } data     数据
 * 常用方法
 * #each 可以循环
 * this 可以访问到当前的上下文
 * #with 可以改变当前的上下文
 * @index 可以获取当前的序列号
 * 对于object，可以使用{{@key}}获取当前的key
 * #unless 的作用和 #if 刚好相反，表达式返回false的时候渲染
 * log 允许执行模板的时候输出当前上下文的状态
 * @first 和 @last 判断当前的第一步和最后一步
 * ../ 引用上一级的作用域
 * [].[0] 数组引用要加 .
 * {{{}}} 不被编码
 */
export default function handlebars (source, data) {
    const template = Handlebars.compile(source);
    const result = template(data);

    return result;
}