import {Component, OnInit, OnDestroy} from "@angular/core";
import {animate, trigger, transition, style, state} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {routeAnimation} from "../ui/utilities/route-animation";

import {UINavService} from "../ui/ui-nav.service";
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
    private games:GameInterface[] = [];

	q:string = "";

    constructor(
		private GamesService:GamesService, 
		private Nav:UINavService,
		private Router:Router,
		private Route:ActivatedRoute
	) {}

    ngOnInit() {
		/*
		this.Nav.setSubNav([
			{ title: "Add Game", icon: "add", callback: this.addGame.bind(this) }
		]);
		*/
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
		this.GamesService.find(this.q).then(games => { 
			//this.staggerIn(games);
			window.setTimeout(() => {
				this.games = games;
			}, 100);
			//this.games = games;
		});
	}

	private staggerIn(games:GameInterface[]) {
		this.games = [];

		let totalTime = 2000;
		let timeout = totalTime / games.length;
		let i = 0;
		let timer = window.setInterval(() => {
			if (!games[i]) {
				window.clearInterval(timer);
			} else {
				this.games.push(games[i]);
				i += 1;
			}
		}, timeout);
	}
}