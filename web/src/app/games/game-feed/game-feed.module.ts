import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {XzorLogoModule} from "../../xzor/xzor-logo/xzor-logo.module";
import {FeedQuiltModule} from "../../feed/feed-quilt/feed-quilt.module";
import {GameFeedComponent} from "./game-feed.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule,
		XzorLogoModule,
		FeedQuiltModule
	],
	declarations: [
		GameFeedComponent
	],
	exports: [
		GameFeedComponent
	]
})
export class GameFeedModule
{}