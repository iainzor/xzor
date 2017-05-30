import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {GameSearchComponent} from "./game-search.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		GameSearchComponent
	],
	exports: [
		GameSearchComponent
	]
})
export class GameSearchModule
{}