import {Component, OnInit, OnDestroy} from "@angular/core";
import {animate, trigger, transition, style, state} from "@angular/core";

import {routeAnimation} from "../ui/utilities/route-animation";
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
	private routeSub;
    private games:GameInterface[] = [];

	q:string = "";

    constructor(private GamesService:GamesService) {}

    ngOnInit() {
        this.search();
    }

	ngOnDestroy() {}

	search() {
		this.GamesService.find(this.q).then(games => { 
			this.staggerIn(games);
		});
	}

	private staggerIn(games:GameInterface[]) {
		this.games = [];

		let i = 0;
		let timer = window.setInterval(() => {
			if (!games[i]) {
				window.clearInterval(timer);
			} else {
				this.games.push(games[i]);
				i += 1;
			}
		}, 100);
	}
}