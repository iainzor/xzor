import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {AccountSignInModule} from "../account-sign-in/account-sign-in.module";
import {AccountMenuComponent} from "./account-menu.component";

@NgModule({
	imports: [
		AccountSignInModule,
		CommonModule,
		RouterModule,
		UIModule
	],
	declarations: [
		AccountMenuComponent
	],
	exports: [
		AccountMenuComponent
	]
})
export class AccountMenuModule
{}