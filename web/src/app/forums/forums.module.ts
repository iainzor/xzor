import {NgModule} from "@angular/core";

import {ForumsService} from "./forums.service";
import {ForumOverviewModule} from "./forum-overview/forum-overview.module";

@NgModule({
	imports: [
		ForumOverviewModule
	],
	exports: [
		ForumOverviewModule
	],
	providers: [
		ForumsService
	]
})
export class ForumsModule
{}