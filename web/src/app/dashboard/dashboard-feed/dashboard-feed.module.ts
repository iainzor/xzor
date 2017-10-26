import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {DashboardFeedComponent} from "./dashboard-feed.component";
import {FeedFilterModule} from "../../feed/feed-filter/feed-filter.module";
import {FeedQuiltModule} from "../../feed/feed-quilt/feed-quilt.module";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		CommonModule,
		FeedFilterModule,
		FeedQuiltModule,
		UIModule
	],
	declarations: [
		DashboardFeedComponent
	],
	exports: [
		DashboardFeedComponent
	]
})
export class DashboardFeedModule
{}