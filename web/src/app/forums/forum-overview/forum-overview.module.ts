import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {ForumOverviewComponent} from "./forum-overview.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		ForumOverviewComponent
	],
	exports: [
		ForumOverviewComponent
	]
})
export class ForumOverviewModule
{}