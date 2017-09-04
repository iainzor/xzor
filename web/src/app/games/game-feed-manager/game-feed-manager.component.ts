import {Component, Input} from "@angular/core";

import {ProviderInterface} from "../../feed/provider.interface";
import {GameInterface} from "../game.interface";
import {GameService} from "../game.service";

@Component({
	selector: "game-feed-manager",
	templateUrl: "./game-feed-manager.component.html"
})
export class GameFeedManagerComponent
{
	@Input() game:GameInterface;
	@Input() providers:ProviderInterface[] = [];
}