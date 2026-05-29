export default defineEventHandler((event) => {
    // console.log('test2',event.context);
    event.context.testmiddleware = 'test2 middleware'
    return {
      hello: 'world from server test2',
      testmiddleware: event.context.testmiddleware,
    }
  })
  