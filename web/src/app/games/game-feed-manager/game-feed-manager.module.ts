import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../../ui/ui.module";
import {GameFeedManagerComponent} from "./game-feed-manager.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UIModule
	],
	declarations: [
		GameFeedManagerComponent
	],
	exports: [
		GameFeedManagerComponent
	]
})
export class GameFeedManagerModule
{}