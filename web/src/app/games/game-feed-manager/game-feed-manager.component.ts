import {Component, Input} from "@angular/core";

import {ProviderInterface} from "../../feed/provider.interface";
import {NotificationsService} from "../../notifications/notifications.service";
import {GameInterface} from "../game.interface";
import {GameService} from "../game.service";

@Component({
	selector: "game-feed-manager",
	templateUrl: "./game-feed-manager.component.html",
	styleUrls: ["./game-feed-manager.component.css"]
})
export class GameFeedManagerComponent
{
	@Input() game:GameInterface;
	@Input() providers:ProviderInterface[] = [];

	constructor(private Game:GameService, private Notifcations:NotificationsService) {}

	save() {
		let settings = {};
		this.providers.forEach((provider) => {
			provider.settings.forEach((setting) => {
				settings[setting.name] = setting.value;
			})
		});
		this.Game.saveSettings(settings).then(() => {
			this.Notifcations.push({
				message: "Feed settings for "+ this.game.title +" have been saved successfully"
			});
		});
	}
}