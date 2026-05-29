export default defineNuxtPlugin((nuxtApp) => {
    // console.log('pluginA');
    nuxtApp.hook('app:created', () => {
        console.log('app:created from pluginA');
    })
    return {
        provide: {
            pluginFunction: (name: string) => {
                return `pluginA: ${name}`
            }
        }
    }
})