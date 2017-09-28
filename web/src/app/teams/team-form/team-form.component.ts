import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountService} from "../../account/account.service";
import {TeamInterface} from "../team.interface";
import {TeamsService} from "../teams.service";
import {TeamFormInterface} from "./team-form.interface";

@Component({
	selector: "team-form",
	templateUrl: "./team-form.component.html",
	styleUrls: ["./team-form.component.css"]
})
export class TeamFormComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	form:TeamFormInterface;
	errors:{[name:string]: string} = {};
	team:TeamInterface = {
		tagPosition: "hidden",
		member: {}
	};
	slug:string;
	tagPositions = [
		{
			value: "hidden",
			label: "Hidden"
		},
		{
			value: "left",
			label: "Left"
		},
		{	value: "right",
			label: "Right"
		}
	];

	@Input("team") set _team(team:TeamInterface) {
		if (team) {
			team.tagPosition = team.tagPosition || "hidden";
		
			this.team = team;
			this.slug = team.slug;
		}
	}
	@Output() save:EventEmitter<TeamInterface> = new EventEmitter<TeamInterface>();

	constructor(private Account:AccountService, private Teams:TeamsService) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			if (!this.team.member) {
				this.team.member = {
					name: account.name
				};
			}
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}

	submit() {
		this.Teams.save(this.slug, this.team).then((form) => {
			this.form = form;
			
			if (form.isValid) {
				this.team = form.data.team;
				this.save.emit(this.team);
			} else {
				this.errors = {};
				for (let name in form.fields) {
					let field = form.fields[name];

					if (!field.isValid) {
						this.errors[name] = field.error || "Unknown error";
					}
				}
			}
		});
	}
}