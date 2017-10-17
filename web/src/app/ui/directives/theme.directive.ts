import {Directive, Input, ElementRef, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {ThemeInterface} from "../theme.interface";
import {ThemesService} from "../themes.service";

const CUSTOM_THEME = "_CUSTOM_";
const DEFAULT_THEME = "_DEFAULT_";

@Directive({
	selector: "[theme]",
	host: {
		"[style.background-color]": "_theme?.background",
		"[style.color]": "_theme?.text",
		"[style.transition]": "'.2s ease-in-out'"
	}
})
export class ThemeDirective implements OnInit, OnDestroy
{
	private themesSub:Subscription;
	private themes:{[name:string]:ThemeInterface} = {};
	private themeName:string = CUSTOM_THEME;
	private theme:ThemeInterface;
	private defaultTheme:ThemeInterface;

	constructor(private Themes:ThemesService, private ElRef:ElementRef) {}

	ngOnInit() {
		this.themesSub = this.Themes.subscribe((themes) => {
			this.themes = themes;
			this.defaultTheme = this.Themes.getDefaultTheme();
		});
	}

	ngOnDestroy() {
		this.themesSub.unsubscribe();
	}

	@Input("theme") set _theme(theme:any) {
		if (typeof theme === "string") {
			this.themeName = theme;
			this.theme = null;
		} else if (theme !== undefined && theme !== null) {
			this.themeName = CUSTOM_THEME;
			this.theme = theme;
		} else {
			this.themeName = DEFAULT_THEME;
			this.theme = null;
		}
	}

	get _theme() : any {
		if (this.themeName === CUSTOM_THEME) {
			return this.theme;
		} else if (this.themeName === DEFAULT_THEME) {
			return this.defaultTheme;
		} else {
			return this.Themes.get(this.themeName);
		}
	}
}