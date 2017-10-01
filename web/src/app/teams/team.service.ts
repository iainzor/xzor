import {Injectable} from "@angular/core";
import {ReplaySubject, Subscription} from "rxjs";

import {AccountService} from "../account/account.service";
import {TeamsService} from "./teams.service";
import {TeamInterface} from "./team.interface";
import {TeamMemberInterface} from "./team-member.interface";
import {PermissionsService} from "../account/permissions.service";
import {Permissions} from "../account/permissions";
import {XzorService} from "../xzor/xzor.service";

@Injectable()
export class TeamService
{
	private _team:TeamInterface;
	private _permissions:Permissions;

	team:ReplaySubject<TeamInterface> = new ReplaySubject<TeamInterface>(1);
	permissions:ReplaySubject<Permissions> = new ReplaySubject<Permissions>(1);

	constructor(
		Account:AccountService,
		private Xzor:XzorService,
		private Teams:TeamsService, 
		private Permissions:PermissionsService
	) {
		Account.subscribe((account) => {
			this.loadPermissions();
		});
	}

	setTeam(team:TeamInterface) {
		this._team = team;
		this.team.next(team);
		this.loadPermissions();
	}

	subscribe(onNext:(team:TeamInterface) => void) : Subscription {
		return this.team.subscribe(onNext);
	}

	getMembers() : Promise<TeamMemberInterface[]> {
		return new Promise<TeamMemberInterface[]>((resolve) => {
			this.Teams.loadMembers(this._team.slug).then((members) => {
				resolve(members);
			});
		});
	}

	loadPermissions() {
		if (this._team) {
			this.Permissions.forResource("team", this._team.slug).then((permissions) => {
				this._permissions = permissions;
				this.permissions.next(permissions);
			});
		}
	}

	loadSettings() : Promise<any> {
		return this.Xzor.get("t/"+ this._team.slug +"/settings.json");
	}
}