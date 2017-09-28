import {NgModule} from "@angular/core";
import {RouterModule, Router} from "@angular/router";

import {TeamFormModule} from "../../../teams/team-form/team-form.module";
import {UIModule} from "../../../ui/ui.module";

import {AdminComponent} from "./admin.component";
import {IndexComponent} from "./index.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: AdminComponent,
				children: [
					{ path: "", component: IndexComponent }
				]
			}
		]),
		TeamFormModule,
		UIModule
	],
	declarations: [
		AdminComponent,
		IndexComponent
	]
})
export class AdminModule
{}