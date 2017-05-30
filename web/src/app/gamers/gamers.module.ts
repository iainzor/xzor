import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UIModule} from "../ui/ui.module";

import {GamersComponent} from "./gamers.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: "", component: GamersComponent }
		]),
		UIModule
	],
	declarations: [
		GamersComponent
	]
})
export class GamersModule
{}