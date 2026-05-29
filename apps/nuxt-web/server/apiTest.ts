// 这个路由不被认可，因为没有放在特定的文件目录中，不会被扫描到
export default defineEventHandler((event) => {
    return {
      hello: 'world from server'
    }
  })
  