/* eslint-disable */
declare module '*.vue' {
  export interface App {
    vm: any
  }
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "alt" {
  import "@altv/types-webview"
  export default alt
}
