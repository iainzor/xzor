import {Component, Input, OnInit} from "@angular/core";

import {TeamSettingDefinition} from "../team-setting/team-setting-definition";
import {TeamInterface} from "../team.interface";
import {TeamsService} from "../teams.service";

@Component({
	selector: "team-settings-form",
	templateUrl: "./team-settings-form.component.html"
})
export class TeamSettingsFormComponent implements OnInit
{
	team:TeamInterface;
	definitions:TeamSettingDefinition[] = [];

	constructor(
		private Teams:TeamsService
	) {}

	ngOnInit() {
		this.Teams.loadAvailableSettings().then((definitions) => {
			this.definitions = definitions;
			
			definitions.forEach((def) => {
				if (!this.team.settings[def.key]) {
					this.team.settings[def.key] = def.defaultValue;
				}
			});
		});
	}

	@Input("team") set _team(team:TeamInterface) {
		this.team = team;
		this.team.settings = team.settings || {};
	};

	isVisible(def:TeamSettingDefinition) : boolean {
		let isVisible = true;

		if (def.conditions) {
			for (let key in def.conditions) {
				if (def.conditions[key] !== this.team.settings[key]) {
					isVisible = false;
				}
			}
		}
		
		return isVisible;
	}
}