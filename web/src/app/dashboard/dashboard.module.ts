import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
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