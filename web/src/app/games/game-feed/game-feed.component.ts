import {Component, Input} from "@angular/core";

import {Feed} from "../../feed/feed";
import {FeedItemInterface} from "../../feed/feed-item.interface";
import {GameInterface} from "../game.interface";
import {GameService} from "../game.service";

@Component({
	selector: "game-feed",
	templateUrl: "./game-feed.component.html",
	styleUrls: ["./game-feed.component.css"]
})
export class GameFeedComponent
{
	loading:boolean = false;
	game:GameInterface;
	feed:Feed;

	constructor(private Game:GameService) {}

	@Input("game") set _game(game:GameInterface) {
		this.game = game;
		this.load();
	}

	private load() {
		this.loading = true;
		this.Game.feed(this.game.slug).then((feed) => {
			this.feed = feed;
			this.loading = false;
		});
	}
}