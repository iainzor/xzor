import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UIModule} from "../../ui/ui.module";

import {TeamSettingsFormComponent} from "./team-settings-form.component";
import {TeamSettingModule} from "../team-setting/team-setting.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UIModule,
		TeamSettingModule
	],
	declarations: [
		TeamSettingsFormComponent
	],
	exports: [
		TeamSettingsFormComponent
	]
})
export class TeamSettingsFormModule
{}