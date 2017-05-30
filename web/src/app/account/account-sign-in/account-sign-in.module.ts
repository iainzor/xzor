import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UIModule} from "../../ui/ui.module";

import {AccountSignInComponent} from "./account-sign-in.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		AccountSignInComponent
	],
	exports: [
		AccountSignInComponent
	]
})
export class AccountSignInModule
{}