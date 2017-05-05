import {Component, OnInit, OnDestroy} from "@angular/core";
import {animate, trigger, transition, style, state} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "../app.service";
import {routeAnimation} from "../ui/utilities/route-animation";
import {GameSearchResponse} from "./game-search-response/game-search-response";
import {GamesService} from "./games.service";
import {GameInterface} from "./game.interface";

@Component({
    selector: "games",
    templateUrl: "./games.component.html",
	styleUrls: ["./games.component.css"],
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
export class GamesComponent implements OnInit, OnDestroy
{
	private routeSub:Subscription;
    
	response:GameSearchResponse;
	q:string = "";
	loading:boolean = false;

    constructor(
		private App:AppService,
		private Games:GamesService, 
		private Router:Router,
		private Route:ActivatedRoute
	) {}

	get showSources() : boolean {
		return (!this.loading && this.q.length) ? true : false;
	}

    ngOnInit() {
		this.routeSub = this.Route.queryParams.subscribe((params) => {
			this.q = params["q"] || "";
        	this.load();
		});
    }

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	search() {
		this.Router.navigate(["/games"], {
			queryParams: {
				q: this.q
			}
		});
	}

	addGame() {
		console.log("ADDING GAME!");
	}

	private load() {
		this.loading = true;
		this.App.setLoading(true);
		this.Games.find(this.q).then(response => {
			this.App.setLoading(false);
			this.loading = false;
			this.response = response;
		});
	}
}