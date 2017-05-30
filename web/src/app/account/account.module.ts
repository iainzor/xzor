import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../ui/ui.module";
import {VendorsModule} from "../vendors/vendors.module";

import {AccountSignInModule} from "./account-sign-in/account-sign-in.module";
import {AccountComponent} from "./account.component";
import {AccountResolver} from "./account.resolver";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: AccountComponent, resolve: 
				{ account: AccountResolver } 
			}
		]),

		UIModule,
		VendorsModule,
		AccountSignInModule
	],
	declarations: [
		AccountComponent
	],
	providers: [
		AccountResolver
	]
})
export class AccountModule
{}