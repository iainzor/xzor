import {Component, OnInit, OnDestroy} from "@angular/core";
import {animate, trigger, transition, style, state} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "../../app.service";
import {AccountService} from "../../account/account.service";
import {AccountInterface} from "../../account/account.interface";
import {UIControlInterface} from "../../ui/ui-controls/ui-control.interface";
import {routeAnimation} from "../../ui/utilities/route-animation";
import {GameSearchResponse} from "../game-search-response/game-search-response";
import {GamesService} from "../games.service";
import {GameInterface} from "../game.interface";

@Component({
    selector: "page-games",
    templateUrl: "./page-games.component.html",
	styleUrls: ["./page-games.component.css"],
	animations: [
		routeAnimation("games"),
		trigger("game", [
			transition("void => *", [
				style({
					opacity: 0,
					transform: "translateY(25%)",
				}),
				animate("0.2s ease-in-out", style({
					opacity: 1,
					transform: "translateY(0)"
				}))
			]),
			transition("* => void", [
				animate(".2s ease-in-out", style({
					opacity: 0,
					transform: "scale(.8)"
				}))
			])
		])
	],
	host: {
		"[@games]": ""
	}
})
export class PageGamesComponent implements OnInit, OnDestroy
{
	private routeSub:Subscription;
	private accountSub:Subscription;
    
	response:GameSearchResponse;
	
	q:string = "";
	
	loading:boolean = false;
	
	account:AccountInterface;

	controls:UIControlInterface[] = [
		{ icon: "add", title: "Add A Game", route: ["/games", "add"] }
	];

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
		this.response = null;
		
		this.Games.find(this.q).then(response => {
			this.App.setLoading(false);
			this.loading = false;
			this.response = response;
		});
	}
}