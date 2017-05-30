import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {GameComponentsModule} from "../games/game-components.module";
import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: DashboardComponent }
		]),

		GameComponentsModule,
		UIModule,
		XzorModule
	],
	declarations: [
		DashboardComponent
	]
})
export class DashboardModule
{}