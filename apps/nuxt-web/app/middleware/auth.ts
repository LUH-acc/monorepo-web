export default defineNuxtRouteMiddleware((to, from) => {
    if(from.name == 'changeLayout' && to.query.name == 'test') {
        return abortNavigation({
            statusCode: 403,
            statusMessage: 'Forbidden',
        })
    }
})