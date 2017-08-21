import {animate, trigger, transition, state, style} from "@angular/animations";
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountService} from "../../account/account.service";
import {GameInterface} from "../game.interface";
import {GameService} from "../game.service";

@Component({
	selector: "game-follow",
	templateUrl: "./game-follow.component.html",
	styleUrls: ["./game-follow.component.css"],
	animations: [
		trigger("iconTrigger", [
			state("hidden", style({
				opacity: 0,
				visibility: "hidden"
			})),
			state("visible", style({
				opacity: 1,
				visibility: "visible"
			})),
			transition("hidden <=> visible", animate(".2s ease-in-out"))
		])
	]
})
export class GameFollowComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	@Input() game:GameInterface;

	canFollow:boolean = false;

	constructor(
		private Account:AccountService,
		private Game:GameService
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.canFollow = account.isValid;
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}

	get activeState() : string {
		return this.game.following ? "visible" : "hidden";
	}

	get blankState() : string {
		return this.game.following ? "hidden" : "visible";
	}

	get title() : string {
		return this.game.following
			? "Stop Following "+ this.game.title
			: "Follow "+ this.game.title;
	}

	toggle(e:MouseEvent) {
		e.preventDefault();

		this.game.following = !this.game.following;

		if (this.game.following) {
			this.Game.follow();
		} else {
			this.Game.unfollow();
		}
	}
}