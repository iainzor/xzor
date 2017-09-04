import {animate, trigger, transition, style, state, stagger, query} from "@angular/animations";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "../../../app.service";
import {AccountService} from "../../../account/account.service";
import {AccountInterface} from "../../../account/account.interface";
import {UIControlInterface} from "../../../ui/ui-controls/ui-control.interface";
import {routeAnimation} from "../../../ui/utilities/route-animation";
import {GamesService} from "../../games.service";
import {GameInterface} from "../../game.interface";
import {GameSearchResponseInterface} from "../../game-search-response.interface";

const GameListEnterAnimations = [
	style({
		opacity: 0,
		transform: "scale(.5)"
	}),
	stagger(100, [
		animate(".2s ease-in-out", style({
			opacity: 1,
			transform: "scale(1)"
		}))
	])
];

@Component({
    selector: "page-games-all",
    templateUrl: "./all.component.html",
	styleUrls: ["./all.component.css"],
	animations: [
		trigger("gameList", [
			transition("* => *", [
				query(".game-col:enter", GameListEnterAnimations, { optional: true })
			])
		])
	]
})
export class AllComponent implements OnInit, OnDestroy
{
	private routeSub:Subscription;
	private accountSub:Subscription;
	
	q:string = "";
	loading:boolean = false;
	account:AccountInterface;
	controls:UIControlInterface[] = [];
	response:GameSearchResponseInterface;

    constructor(
		private App:AppService,
		private Account:AccountService,
		private Games:GamesService,
		private Router:Router,
		private Route:ActivatedRoute
	) {}
	
    ngOnInit() {
		this.App.setPageTitle("Games");

		this.routeSub = this.Route.queryParams.subscribe((params) => {
			this.q = params["q"] || "";
        	this.load();
		});
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
			this.controls = [];

			if (account.isValid) {
				this.controls = [
					{ icon: "add", title: "Add A Game", route: ["/games", "add"] }
				];
			}
		});
    }

	ngOnDestroy() {
		this.App.resetPageTitle();
		this.routeSub.unsubscribe();
		this.accountSub.unsubscribe();
	}

	search() {
		this.Router.navigate(["/games"], {
			queryParams: {
				q: this.q
			}
		});
	}

	private load() {
		this.App.setLoading(true);

		this.loading = true;
		
		this.Games.find(this.q).then(response => {
			this.App.setLoading(false);
			this.loading = false;
			this.response = response;
		});
	}
}