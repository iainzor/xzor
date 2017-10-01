import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in.component";
import {CanSignIn} from "./can-sign-in";

import {AccountSignInModule} from "../../account/account-sign-in/account-sign-in.module";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: "", component: SignInComponent, canActivate: [CanSignIn] }
		]),
		AccountSignInModule,
		UIModule
	],
	declarations: [
		SignInComponent
	],
	providers: [
		CanSignIn
	]
})
export class SignInModule
{}