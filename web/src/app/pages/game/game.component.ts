import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {routeAnimation} from "../../ui/utilities/route-animation";
import {UINavPageInterface} from "../../ui/ui-nav/ui-nav-page.interface";
import {AppService} from "../../app.service";
import {AccountInterface} from "../../account/account.interface";
import {AccountService} from "../../account/account.service";
import {NotificationsService} from "../../notifications/notifications.service";
import {GameService} from "../../games/game.service";
import {GameInterface} from "../../games/game.interface";

@Component({
	selector: "pages-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.css"],
	animations: [
		routeAnimation("game")
	],
	host: {
		"[@game]": ""
	}
})
export class GameComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;
	private dataSub:Subscription;

	account:AccountInterface;
	game:GameInterface;
	pages:UINavPageInterface[] = [];

	constructor(
		private App:AppService,
		private Account:AccountService,
		private Notifications:NotificationsService,
		private Game:GameService,
		private Route:ActivatedRoute,
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
			this.regeneratePages();
		});
		this.dataSub = this.Route.data.subscribe((data) => {
			this.game = data["game"];
			
			this.App.setPageTitle(this.game.title);
			this.Game.setGame(this.game);
			this.regeneratePages();
		});
	}

	ngOnDestroy() {
		this.App.resetPageTitle();
		this.accountSub.unsubscribe();
		this.dataSub.unsubscribe();
	}

	regeneratePages() {
		let pages:UINavPageInterface[];

		if (this.game) {
			pages = [
				{ title: "Overview", path: ["/g", this.game.slug], activeExact: true },
				//{ title: "Forums", path: ["/g", this.game.slug, "forums"] }
			];

			if (this.account && this.account.isValid) {
				pages.push({ spacer: true });
				pages.push({ 
					icon: this.game.following ? "favorite" : "favorite_border", 
					title: this.game.following ? "Unfollow" : "Follow",
					hideTitle: true,
					callback: () => { this.toggleFollowing(); } 
				});

				if (this.game.role && this.game.role.allowAll) {
					pages.push({
						icon: "settings",
						title: "Manage Game",
						hideTitle: true,
						path: ["/g", this.game.slug, "manage"]
					});
				}
			}
		}

		this.pages = pages;
	}

	toggleFollowing() {
		if (this.game.following) {
			this.Game.unfollow().then((response) => {
				this.Notifications.push({
					message: response.message
				});
			});
		} else {
			this.Game.follow().then((response) => {
				this.Notifications.push({
					message: response.message
				});
			});
		}
		
		this.game.following = !this.game.following;
		this.regeneratePages();
	}
}