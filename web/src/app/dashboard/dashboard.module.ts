import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: "", component: DashboardComponent }
		]),

		XzorModule
	],
	declarations: [
		DashboardComponent
	]
})
export class DashboardModule
{}