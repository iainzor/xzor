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

	loading:boolean = false;
	game:GameInterface;
	feed:Feed;

	constructor(private Game:GameService) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.loading = true;

			this.Game.feed().then((feed) => {
				this.feed = feed;
				this.loading = false;
			});
		});
	}

	ngOnDestroy() {
		this.gameSub.unsubscribe();
	}
}