import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {GameFollowComponent} from "./game-follow.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		GameFollowComponent
	],
	exports: [
		GameFollowComponent
	]
})
export class GameFollowModule
{}