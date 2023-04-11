import type { OnInit, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { ViewChild, ViewContainerRef, inject } from '@angular/core';

/**
 * AsPureTemplateComponent is a mixin that can be used to turn a component into a pure template without tag rounded.
 */
@Component({
	template: '',
	standalone: true,
})
export class AsPureTemplateMixinComponent implements OnInit {
	@ViewChild('template', { static: true }) template!: TemplateRef<unknown>;

	private vcr = inject(ViewContainerRef);

	ngOnInit(): void {
		this.vcr.createEmbeddedView(this.template);
		this.vcr.element.nativeElement.remove();
	}
}
