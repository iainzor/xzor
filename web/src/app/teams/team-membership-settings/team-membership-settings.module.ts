import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UIModule} from "../../ui/ui.module";

import {TeamMembershipSettingsComponent} from "./team-membership-settings.component";
import {TeamSettingModule} from "../team-setting/team-setting.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UIModule,
		TeamSettingModule
	],
	declarations: [
		TeamMembershipSettingsComponent
	],
	exports: [
		TeamMembershipSettingsComponent
	]
})
export class TeamMembershipSettingsModule
{

}