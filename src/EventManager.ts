export default class EventManager {
    eventList: {[key: string]: any} = {}

    public on (eventName: string, fn: any): void {
        this.eventList[eventName] = fn
    }

    public emit (eventName: string, ...args: any): void {
        this.eventList[eventName](...args)
    }

    public off (eventName: string): void {
        delete this.eventList[eventName]
    }

    public callGame (event: { type: "client"|"server", name: string }, ...args: any[]): void {
        alt.emit("webview:CallGame", event, ...args)
    }
}
