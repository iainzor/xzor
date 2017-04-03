import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {GoogleAuthService} from "../vendors/google/google-auth.service";
import {UIModule} from "../ui/ui.module";
import {VendorsModule} from "../vendors/vendors.module";
import {AccountComponent} from "./account.component";
import {AccountService} from "./account.service";
import {AuthService} from "./auth.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: "account", component: AccountComponent }
		]),

		UIModule,
		VendorsModule
	],
	declarations: [
		AccountComponent
	],
	providers: [
		AccountService,
		AuthService,
		GoogleAuthService
	]
})
export class AccountModule
{}