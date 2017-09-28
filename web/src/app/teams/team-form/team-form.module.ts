import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../../ui/ui.module";
import {XzorModule} from "../../xzor/xzor.module";
import {TeamFormComponent} from "./team-form.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UIModule,
		XzorModule
	],
	declarations: [
		TeamFormComponent
	],
	exports: [
		TeamFormComponent
	]
})
export class TeamFormModule
{}