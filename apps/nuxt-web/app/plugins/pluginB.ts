export default defineNuxtPlugin((nuxtApp) => {
    // console.log('pluginB');
    nuxtApp.hook('app:created', () => {
        console.log('app:created from pluginB');
    })
    const title = useTitle()
    return {
        provide: {
            testPluginB: 'testPluginB from pluginB ',
            title: title.value,
        },
    }
})