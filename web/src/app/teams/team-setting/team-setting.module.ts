import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {TeamSettingComponent} from "./team-setting.component";

@NgModule({
	imports: [ 
		CommonModule,
		FormsModule
	],
	declarations: [
		TeamSettingComponent
	],
	exports: [
		TeamSettingComponent
	]
})
export class TeamSettingModule
{}