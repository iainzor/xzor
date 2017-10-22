import {animate, trigger, transition, style, state, stagger, query} from "@angular/animations";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "../../app.service";
import {AccountService} from "../../account/account.service";
import {AccountInterface} from "../../account/account.interface";
import {UINavPageInterface} from "../../ui/ui-nav/ui-nav-page.interface";
import {routeAnimation} from "../../ui/utilities/route-animation";
import {GamesService} from "../../games/games.service";
import {GameInterface} from "../../games/game.interface";
import {GameSearchResponseInterface} from "../../games/game-search-response.interface";

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
    selector: "pages-games",
    templateUrl: "./games.component.html",
	styleUrls: ["./games.component.css"],
	animations: [
		routeAnimation("games"),
		trigger("gameList", [
			transition("* => *", [
				query(".game-col:enter", GameListEnterAnimations, { optional: true })
			])
		])
	],
	host: {
		"[@games]": ""
	}
})
export class GamesComponent implements OnInit, OnDestroy
{
	private routeSub:Subscription;
	private accountSub:Subscription;
	
	q:string = "";
	loading:boolean = false;
	account:AccountInterface;
	response:GameSearchResponseInterface;
	pages:UINavPageInterface[] = [];

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
			this.regeneratePages();
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

	private regeneratePages() {
		this.pages = [
			{
				title: "All Games",
				path: ["/games"],
				activeExact: true
			}
		];

		if (this.account && this.account.isValid) {
			this.pages.push({ spacer: true });
			this.pages.push({
				title: "Add A Game",
				hideTitle: true,
				icon: "add_circle",
				path: ["/games", "add"]
			});
		}
	}
}