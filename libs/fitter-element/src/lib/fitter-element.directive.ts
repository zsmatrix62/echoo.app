import { AfterViewInit, Directive, Input, ViewContainerRef, inject } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { WINDOW } from '@ng-web-apis/common';
import { fromEvent, map } from 'rxjs';

@UntilDestroy()
@Directive({
	selector: '[fitterElement]',
	standalone: true,
})
export class FitterElementDirective implements AfterViewInit {
	@Input() fitHeight = false;
	@Input() fitWidth = false;

	originalHeight = 0;
	originalWidth = 0;

	readonly windowOriginalHeight: number;
	readonly windowOriginalWidth: number;

	window = inject(WINDOW);
	private resized$ = fromEvent(this.window, 'resize').pipe(
		map((event) => {
			const win: Window = <Window>event.target;
			return {
				height: win?.innerHeight ?? 0,
				width: win?.innerWidth ?? 0,
			};
		}),
	);

	private vcr = inject(ViewContainerRef);

	constructor() {
		this.windowOriginalHeight = this.window?.innerHeight ?? 0;
		this.windowOriginalWidth = this.window?.innerWidth ?? 0;
	}

	ngAfterViewInit(): void {
		const rect = this.vcr.element.nativeElement.getBoundingClientRect();
		this.originalHeight = rect.height;
		this.originalWidth = rect.width;

		this.resized$.subscribe((size) => {
			// calculate height and width delta
			const heightDelta = size.height - this.windowOriginalHeight;

			const widthDelta = size.width - this.windowOriginalWidth;
			if (this.fitHeight) {
				this.vcr.element.nativeElement.style.height = `${this.originalHeight + heightDelta}px`;
			}

			if (this.fitWidth) {
				this.vcr.element.nativeElement.style.width = `${this.originalWidth + widthDelta}px`;
			}
		});
	}
}
