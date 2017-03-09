import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../ui/ui.module";
import {AccountComponent} from "./account.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: AccountComponent }
		]),

		UIModule
	],
	declarations: [
		AccountComponent
	]
})
export class AccountModule
{}