import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {Permissions} from "../../account/permissions";
import {TeamService} from "../../teams/team.service";
import {TeamInterface} from "../../teams/team.interface";
import {routeAnimation} from "../../ui/utilities/route-animation";
import {UINavPageInterface} from "../../ui/ui-nav/ui-nav-page.interface";

@Component({
	selector: "pages-team",
	templateUrl: "./team.component.html",
	animations: [
		routeAnimation("routeAnimation")
	],
	host: {
		"[@routeAnimation]": ""
	}
})
export class TeamComponent implements OnInit, OnDestroy
{
	private teamSub:Subscription;
	private permissionsSub:Subscription;

	team:TeamInterface;
	pages:UINavPageInterface[] = [];
	permissions:Permissions;

	constructor(private Team:TeamService) {}

	ngOnInit() {
		this.teamSub = this.Team.subscribe((team) => {
			this.team = team;
			this.generatePages();
		});
		this.permissionsSub = this.Team.permissions.subscribe((permissions) => {
			this.permissions = permissions;
			this.generatePages();
		});
	}

	ngOnDestroy() {
		this.teamSub.unsubscribe();
	}

	generatePages() {
		this.pages = [
			{ path: ["/t", this.team.slug], title: "Overview", activeExact: true }
		];

		if (this.permissions && this.permissions.isAllowed("manage")) {
			this.pages.push(
				{ spacer: true },
				{ path: ["/t", this.team.slug, "manage"], icon: "settings", title: "Manage", hideTitle: true }
			);
		}
	}
}