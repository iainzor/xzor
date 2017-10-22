import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {Feed} from "../../feed/feed";
import {FeedItemInterface} from "../../feed/feed-item.interface";
import {GameInterface} from "../game.interface";
import {GameService} from "../game.service";

@Component({
	selector: "game-feed",
	templateUrl: "./game-feed.component.html",
	styleUrls: ["./game-feed.component.css"]
})
export class GameFeedComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;
	private interval:any;

	loading:boolean = false;
	refreshing:boolean = false;
	loadIntervalTime:number = 5000;
	game:GameInterface;
	feed:Feed;

	constructor(private Game:GameService) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;
			this.load().then(() => {
				this.nextInterval();
			});
		});
	}

	ngOnDestroy() {
		this.gameSub.unsubscribe();
		clearTimeout(this.interval);
	}

	nextInterval() {
		this.load(true).then(() => {
			this.interval = setTimeout(this.nextInterval.bind(this), this.loadIntervalTime);
		});
	}

	load(fresh:boolean = false) : Promise<Feed> {
		this.loading = true;
		this.refreshing = fresh;

		let p = this.Game.feed(fresh);
		p.then((feed) => {
			if (this.feed) {
				this.feed.merge(feed);
			} else {
				this.feed = feed;
			}
			
			this.loading = false;
		});
		return p;
	}
}