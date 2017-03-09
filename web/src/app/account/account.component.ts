import {Component} from "@angular/core";

import {routeAnimation} from "../ui/utilities/route-animation";
import {ThemeService} from "../ui/theme.service";
import {ThemeInterface} from "../ui/theme.interface";

@Component({
	selector: "account",
	templateUrl: "./account.component.html",
	animations: [
		routeAnimation("account")
	],
	host: {
		"[@account]": ""
	}
})
export class AccountComponent
{
	theme:ThemeInterface;

	constructor(private themeService:ThemeService) {
		themeService.subscribe((theme) => {
			this.theme = theme;
		});
	}

	submit() {
		this.themeService.apply(this.theme);
	}
}