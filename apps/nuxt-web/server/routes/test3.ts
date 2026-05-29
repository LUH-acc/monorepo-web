export default defineEventHandler((event) => {
    // 可以添加数据到event.context中，在路由中可以访问到
    // console.log('test3',event.context);
    // 返回数据会被当做响应体返回给客户端，页面直接展示数据
    return {
      hello: 'world from server test3',
      testmiddleware: event.context.testmiddleware,
    }
  })
  