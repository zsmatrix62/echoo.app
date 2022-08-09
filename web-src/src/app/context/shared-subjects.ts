import { createContext, ReactNode } from "react";
import { ReplaySubject, Subject } from "rxjs";

const tauri = require("@tauri-apps/api")

class SharedSubjects {
	public activeToolNode$ = new ReplaySubject<ReactNode>(1);
	// public toolsNavSearch$ = new ReplaySubject<string>(1)
	public windowSizeChange$ = new ReplaySubject<[number, number]>(1)
	// public toolMainContentSizeChanged$ = new ReplaySubject<[number, number]>(1)
	// public toolContentWidthChanged$ = new ReplaySubject<number>(1)
	// public toolContentHeightChanged$ = new ReplaySubject<number>(1)
	public tauri$: ReplaySubject<typeof tauri>
	public beEvent$: Subject<object> = new Subject<any>()

	constructor() {
		this.tauri$ = new ReplaySubject<typeof tauri | undefined>(1)

		// @ts-ignore
		const tauriAPI = window.__TAURI__
		this.tauri$.next(tauriAPI)
	}
}

export const SharedSubjectContext = createContext(new SharedSubjects());
