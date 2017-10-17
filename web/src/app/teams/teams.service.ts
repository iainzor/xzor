import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {XzorService} from "../xzor/xzor.service";
import {TeamInterface} from "./team.interface";
import {TeamMemberInterface} from "./team-member.interface";
import {TeamFormInterface} from "./team-form/team-form.interface";
import {TeamSettingDefinition} from "./team-setting/team-setting-definition";

@Injectable()
export class TeamsService
{
	constructor(private Xzor:XzorService) {}

	save(slug:string, team:TeamInterface) : Promise<TeamFormInterface> {
		var uri = team.id ? "t/"+ slug +".json" : "teams/new.json";

		return this.Xzor.post(uri, JSON.stringify(team));
	}

	load(slug:string) : Promise<TeamInterface> {
		return this.Xzor.get("t/"+ slug +".json");
	}

	loadAll(search:{[key:string]:string} = {}) : Promise<TeamInterface[]> {
		let params = new URLSearchParams();
		for (let key in search) {
			params.set(key, search[key]);
		}

		return this.Xzor.get("teams.json", params);
	}

	loadMembers(slug:string) : Promise<TeamMemberInterface[]> {
		return this.Xzor.get("t/"+ slug +"/members.json");
	}

	loadAvailableSettings() : Promise<TeamSettingDefinition[]> {
		return this.Xzor.get("teams/available-settings.json");
	}
}