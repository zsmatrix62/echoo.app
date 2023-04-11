import { AfterViewInit, Directive, ElementRef, Input, ViewContainerRef, inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { fromEvent } from 'rxjs';

@Directive({
	selector: '[syncHeightWith]',
	standalone: true,
})
export class SyncStyleWithElementDirective implements AfterViewInit {
	@Input() syncHeightWith?: unknown;

	private win = inject(WINDOW);
	private vcr = inject(ViewContainerRef);

	constructor() {}

	ngAfterViewInit(): void {
		this.syncHeight();
	}

	private syncHeight() {
		const aa = 1;
		if (!this.syncHeightWith) {
			return;
		}
		const element = <HTMLElement>this.syncHeightWith;
		const setHeight = () => {
			this.vcr.element.nativeElement.style.height = `${element.clientHeight}px`;
		};
		fromEvent(this.win, 'resize').subscribe(() => {
			setHeight();
		});
		setHeight();
	}
}
