import {Component, Input} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {AccountInterface} from "../../account/account.interface";
import {Feed} from "../../feed/feed";
import {GameInterface} from "../../games/game.interface";
import {GamesService} from "../../games/games.service";
import {GameService} from "../../games/game.service";
import {UIMenuItemInterface} from "../../ui/ui-menu/ui-menu-item.interface";

@Component({
	selector: "dashboard-feed",
	templateUrl: "./dashboard-feed.component.html",
	styleUrls: ["./dashboard-feed.component.css"]
})
export class DashboardFeedComponent
{
	private gameFeeds:{[id:number]:Feed} = {};

	account:AccountInterface;
	games:GameInterface[] = [];
	feed:Feed = new Feed([]);
	
	gamesMenu:UIMenuItemInterface = {
		title: "Games",
		children: []
	};

	sourcesMenu:UIMenuItemInterface = {
		title: "Sources",
		children: []
	};

	menuItems:UIMenuItemInterface[] = [
		this.gamesMenu,
		this.sourcesMenu
	];

	@Input("account") set _account(account:AccountInterface) {
		this.account = account;
		this.load();
	}

	constructor(private Games:GamesService, private Game:GameService) {}

	load() {
		let params = new URLSearchParams();
		if (this.account && this.account.isValid) {
			params.set("following", "1");
		}
		this.Games.loadList(params).then((games) => {
			this.games = games;
			this.games.forEach((game) => {
				game.active = true;

				this.Game.setGame(game);
				this.Game.feed().then((feed) => {
					this.gameFeeds[game.id] = feed;
					this.generateFeed();
				});
			});
		});
	}

	generateFeed() {
		this.feed.empty();

		this.games.forEach((game) => {
			if (this.gameFeeds[game.id] && game.active) {
				this.feed.merge(
					this.gameFeeds[game.id]
				);
			}
		});

		console.log(this.feed);

		this.generateMenuItems();
	}

	generateMenuItems() {
		this.gamesMenu.children = this.games.map((game) => {
			return {
				title: game.title,
				theme: game.theme,
				icon: game.active ? "check_box" : "check_box_outline_blank",
				onClick: (item, e) => { 
					e.preventDefault();
					game.active = !game.active;
					this.generateFeed();
				}
			}
		});

		this.sourcesMenu.children = this.feed.providers.map((provider) => {
			return {
				title: provider.name,
				theme: provider.theme,
				icon: provider.active ? "check_box" : "check_box_outline_blank",
				onClick: (item, e) => {
					e.preventDefault();
					provider.active = !provider.active;
					this.generateFeed();
				}
			}
		});
	}
}