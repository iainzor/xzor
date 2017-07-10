import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {FeedItemComponent} from "./feed-item.component";
import {FeedItemRendererComponent} from "./feed-item-renderer.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		FeedItemComponent,
		FeedItemRendererComponent
	],
	exports: [
		FeedItemComponent
	]
})
export class FeedItemModule
{}