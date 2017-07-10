import {Component, ComponentRef, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewContainerRef} from "@angular/core";

import {FeedItem} from "../feed-item";
import {FeedComponentsService} from "../feed-components.service";

@Component({
	selector: "feed-item-renderer",
	template: ``
})
export class FeedItemRendererComponent implements OnInit, OnChanges
{
	@Input() item:FeedItem<any>;

	componentRef:ComponentRef<any>;

	constructor(
		private FeedComponents:FeedComponentsService,
		private ComponentFactoryResolver:ComponentFactoryResolver,
		private ViewContainerRef:ViewContainerRef
	) {}

	ngOnInit() {
		let componentClass = this.FeedComponents.get(this.item.provider.slug);
		let componentFactory = this.ComponentFactoryResolver.resolveComponentFactory(componentClass);

		this.componentRef = this.ViewContainerRef.createComponent(componentFactory);
		this.componentRef.instance.item = this.item;
		this.componentRef.changeDetectorRef.detectChanges();
	}

	ngOnChanges() {
		if (this.componentRef) {
			this.componentRef.instance.item = this.item;
		}
	}
}