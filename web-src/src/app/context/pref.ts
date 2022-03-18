import {Observer, ReplaySubject, Subscribable, Unsubscribable} from "rxjs";

class StoreItem<T> implements Subscribable<T> {
    public $: ReplaySubject<T> = new ReplaySubject<T>()

    constructor(private readonly key: string, private defaultValue: T
    ) {
        // console.log(key, defaultValue)
        this.key = this.key.trim().toLowerCase()
        this.$.next(this.value)
    }

    public get value() {
        let val = this.getValueFromStore();
        console.debug(`read value from store: ${this.key} = ${val}`)
        return val
    }

    public set value(value: T) {
        let storeVal = JSON.stringify({value: value})
        console.debug(`setting store item: ${this.key}=${storeVal}`)
        localStorage.setItem(this.key, storeVal)
        this.$.next(value)
    }

    public subscribe(observer: Partial<Observer<T>> | undefined): Unsubscribable {
        return this.$.subscribe(observer)
    }

    public toggle() {
        if (["Boolean", "boolean"].includes(typeof this.value)) {
            // @ts-ignore
            this.value = !this.value;
        }
    }

    private getValueFromStore(): T {
        let value: string = localStorage.getItem(this.key) ?? '';
        if (!value) {
            return this.defaultValue
        }
        try {
            let initial = JSON.parse(value);
            let innerValue = initial["value"]
            if (innerValue === undefined) {
                this.value = this.defaultValue
                return this.defaultValue
            }
            return innerValue;
        } catch (e) {
            return this.defaultValue
        }
    }
}

export class Pref {
    private static instance: Pref

    public darkModeEnabled = new StoreItem<boolean>("pref:dark-mode", false)
    public theme = new StoreItem<string>("pref:theme", "system")
    public osName = new StoreItem<string>("pref:os", "")
    public toolsSiderCollapsed = new StoreItem<boolean>("pref:sider-collapsed", true)
    public jsonFormatterDefaultIndentSpace = new StoreItem<number>("pref:json-formatter:default-indent-space", 2)

    public static getInstance(): Pref {
        if (!Pref.instance) {
            Pref.instance = new Pref();
        }
        return Pref.instance
    }
}


