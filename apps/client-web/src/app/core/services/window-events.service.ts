import { Injectable, inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { fromEvent, map } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Injectable({
	providedIn: 'root',
})
export class WindowEventsService {
	private window = inject(WINDOW);
	WindowResize$ = fromEvent(this.window, 'resize').pipe(
		map((evt: Event) => {
			const win = <Window>evt.target;
			return {
				height: win.innerHeight,
				width: win.innerWidth,
			};
		}),
	);
}
