import {Injectable} from "@angular/core";
import {ReplaySubject, Subscription} from "rxjs";

import {TeamsService} from "./teams.service";
import {TeamInterface} from "./team.interface";
import {TeamMemberInterface} from "./team-member.interface";
import {PermissionsService} from "../account/permissions.service";
import {Permissions} from "../account/permissions";

@Injectable()
export class TeamService
{
	private _team:TeamInterface;
	private _permissions:Permissions;

	team:ReplaySubject<TeamInterface> = new ReplaySubject<TeamInterface>(1);
	permissions:ReplaySubject<Permissions> = new ReplaySubject<Permissions>(1);

	constructor(private Teams:TeamsService) {}

	setTeam(team:TeamInterface) {
		this._team = team;
		this.team.next(team);
	}

	subscribe(onNext:(team:TeamInterface) => void) : Subscription {
		return this.team.subscribe(onNext);
	}

	setPermissions(permissions:Permissions) {
		this._permissions = permissions;
		this.permissions.next(permissions);
	}

	getMembers() : Promise<TeamMemberInterface[]> {
		return new Promise<TeamMemberInterface[]>((resolve) => {
			this.Teams.loadMembers(this._team.slug).then((members) => {
				resolve(members);
			});
		});
	}
}