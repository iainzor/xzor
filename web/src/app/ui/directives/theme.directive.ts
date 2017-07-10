import {Directive, Input, ElementRef, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {ThemeInterface} from "../theme.interface";
import {ThemesService} from "../themes.service";

const CUSTOM_THEME = "_CUSTOM_";

@Directive({
	selector: "[theme]",
	host: {
		"[style.background-color]": "_theme?.background",
		"[style.color]": "_theme?.text",
		"[style.transition]": "'.2s ease-in-out'"
	}
})
export class ThemeDirective implements OnInit, OnDestroy /*extends AbstractThemeDirective*/
{
	private themesSub:Subscription;
	private themes:{[name:string]:ThemeInterface} = {};
	private themeName:string = CUSTOM_THEME;
	private theme:ThemeInterface;

	constructor(private Themes:ThemesService, private ElRef:ElementRef) {}

	ngOnInit() {
		this.themesSub = this.Themes.subscribe((themes) => {
			this.themes = themes;
		});
	}

	ngOnDestroy() {
		this.themesSub.unsubscribe();
	}

	@Input("theme") set _theme(theme:any) {
		if (typeof theme === "string") {
			this.themeName = theme;
			this.theme = null;
		} else {
			this.themeName = CUSTOM_THEME;
			this.theme = theme;
		}
	}

	get _theme() : any {
		return this.themeName === CUSTOM_THEME ? this.theme : this.Themes.get(this.themeName);
	}
}