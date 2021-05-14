import { createApp, defineComponent } from 'vue'

import { Controller, EventManager } from './main'
import AppComponent from './App.vue'
import Router from "./router"
import store from './store'

export default class AppController {
    public params: {[key: string]: any} = {}
    public app: {[key: string]: any} = {}

    public async loadApp (appName: string, params: any | undefined): Promise<void> {
        if (Router[appName] === undefined) return console.log(`[WEBVIEW] ${appName} does not exist in Router`)

        if (params === undefined) params = {}
        this.params[appName] = {}

        const alreadyExist = document.querySelectorAll('div')
        alreadyExist.forEach(el => {
            if (el.id === appName) {
                this.app[appName].unmount('#' + appName)
                el.remove()
            }
        })

        const element = document.createElement('div')
        element.id = appName
        document.body.appendChild(element)

        const ApplicationComponent = defineComponent(AppComponent)
        const Component = defineComponent(Router[appName]["home"])

        const app = createApp(ApplicationComponent)

        app.config.globalProperties = {
            $controller: Controller,
            $event: EventManager,
            $component: Component,
            params: this.params[appName],
            appName
        }

        app.use(store)

        this.app[appName] = app
        this.app[appName].vm = app.mount('#' + appName)
    }

    public changePage (appName: string, pageName: string, params: any): void {
        if (Router[appName] === undefined) return console.log(`[WEBVIEW] ${appName} does not exist in Router`)
        if (Router[appName][pageName] === undefined) return console.log(`[WEBVIEW] ${pageName} does not exist for app: ${appName} in Router`)

        this.params[appName] = params

        const Component = defineComponent(Router[appName][pageName])

        this.app[appName].config.globalProperties.$component = Component
        this.app[appName].vm.$forceUpdate()
    }

    destroyApp (appName: string): void {
        if (Router[appName] === undefined) return console.log(`[WEBVIEW] ${appName} does not exist in Router`)

        const element = document.querySelectorAll('div')
        element.forEach(el => {
            if (el.id === appName) {
                this.app[appName].unmount('#' + appName)
                delete this.app[appName]
                el.remove()

                if ('alt' in window) alt.emit('webview:AppDestroy', appName)
            }
        })
    }
}
