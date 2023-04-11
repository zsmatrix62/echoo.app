import type { OnInit, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { ViewChild, ViewContainerRef, inject } from '@angular/core';

/**
 * AsPureTemplateComponent is a mixin that can be used to turn a component into a pure template without tag rounded.
 * It is useful when you want to use a component as a template but you don't want to add a tag to the DOM.
 * must be rounded by <ng-template #template>...</ng-template>
 * <ng-template #template>
 * ...
 * </ng-template>
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
