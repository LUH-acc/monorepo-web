export default defineEventHandler((event) => {
    // console.log('log',event.context);
    // 可以添加数据到event.context中，在路由中可以访问到
    event.context.testmiddleware = 'log middleware'
    // 返回数据会被当做响应体返回给客户端，页面直接展示数据
    // return event.context.testmiddleware
})