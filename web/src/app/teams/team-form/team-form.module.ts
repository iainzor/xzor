import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../../ui/ui.module";
import {XzorModule} from "../../xzor/xzor.module";
import {TeamSettingsFormModule} from "../team-settings-form/team-settings-form.module";
import {TeamFormComponent} from "./team-form.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UIModule,
		XzorModule,
		TeamSettingsFormModule
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