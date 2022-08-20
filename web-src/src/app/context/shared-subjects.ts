import { createContext, ReactNode } from "react";
import { ReplaySubject, Subject } from "rxjs";

class SharedSubjects {
	public activeToolNode$ = new ReplaySubject<ReactNode>(1);
	// public toolsNavSearch$ = new ReplaySubject<string>(1)
	public windowSizeChange$ = new ReplaySubject<[number, number]>(1)
	// public toolMainContentSizeChanged$ = new ReplaySubject<[number, number]>(1)
	// public toolContentWidthChanged$ = new ReplaySubject<number>(1)
	// public toolContentHeightChanged$ = new ReplaySubject<number>(1)
	public beEvent$: Subject<object> = new Subject<any>()
}

export const SharedSubjectContext = createContext(new SharedSubjects());
