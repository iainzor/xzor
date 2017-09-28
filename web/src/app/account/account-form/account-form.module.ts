import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../../ui/ui.module";
import {PersonTileModule} from "../../people/person-tile/person-tile.module";
import {AccountFormComponent} from "./account-form.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		PersonTileModule,
		UIModule
	],
	declarations: [
		AccountFormComponent
	],
	exports: [
		AccountFormComponent
	]
})
export class AccountFormModule
{}