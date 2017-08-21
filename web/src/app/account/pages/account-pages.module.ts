import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {AccountFormModule} from "../account-form/account-form.module";
import {AccountPagesComponent} from "./account-pages.component";
import {OverviewComponent} from "./overview.component";

@NgModule({
	imports: [
		AccountFormModule,
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: AccountPagesComponent,
				children: [
					{ path: "", component: OverviewComponent }
				]
			}
		]),
		UIModule
	],
	declarations: [
		AccountPagesComponent,
		OverviewComponent
	]
})
export class AccountPagesModule
{}