import { DefineComponent } from 'vue'

import HomepageHome from '../views/homepage/Home.vue'
import SecondHome from '../views/homepage/Second.vue'

const HomeRouter: {[key: string]: DefineComponent} = {
    home: HomepageHome,
    second: SecondHome
}

const Router: {[key: string]: {[key: string]: DefineComponent}} = {
    "home": HomeRouter
}

export default Router
