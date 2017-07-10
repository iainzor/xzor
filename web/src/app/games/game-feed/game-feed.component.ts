import {Component, Input} from "@angular/core";

import {Feed} from "../../feed/feed";
import {FeedItemInterface} from "../../feed/feed-item.interface";
import {GameInterface} from "../game.interface";
import {GameService} from "../game.service";

@Component({
	selector: "game-feed",
	templateUrl: "./game-feed.component.html"
})
export class GameFeedComponent
{
	game:GameInterface;
	feed:Feed;

	constructor(private Game:GameService) {}

	@Input("game") set _game(game:GameInterface) {
		this.game = game;
		this.Game.feed(game.slug).then((feed) => {
			this.feed = feed;
		});
	}
}