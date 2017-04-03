import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ThemeService} from "../theme.service";
import {ThemeInterface} from "../theme.interface";

@Component({
	selector: "ui-card",
	templateUrl: "./ui-card.component.html",
	styleUrls: ["./ui-card.component.css"],
	host: {
		"[style.background]": "theme?.background",
		"[style.color]": "theme?.color",
		"[style.fill]": "theme?.color"
	}
})
export class UICardComponent implements OnInit, OnDestroy
{
	private themeSub:Subscription;
	private defaultTheme:ThemeInterface;
	private _theme:ThemeInterface;

	@Input() set theme(theme:ThemeInterface) {
		this._theme = theme;
	}

	get theme() : ThemeInterface {
		return this._theme || {
			background: "#f2f2f2",
			border: "#f2f2f2",
			color: "#212121"
		};
	}

	constructor(private ThemeService:ThemeService) {}

	ngOnInit() {
		this.themeSub = this.ThemeService.subscribe((theme) => {
			this.defaultTheme = theme;
		});
	}

	ngOnDestroy() {
		this.themeSub.unsubscribe();
	}
}