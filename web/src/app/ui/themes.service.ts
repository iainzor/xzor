import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";

import {ThemeInterface} from "./theme.interface";

interface ThemeMap 
{
	[name:string]: ThemeInterface;
}

@Injectable()
export class ThemesService
{
	private defaultTheme:ThemeInterface = { 
		background: "#323232", 
		text: "#ffffff" 
	};

	private themes:BehaviorSubject<ThemeMap> = new BehaviorSubject({
		notice: { background: "#00BCD4", text: "#ffffff" }
	});

	subscribe(onNext:(ThemeMap) => void) : Subscription {
		return this.themes.subscribe(onNext);
	}

	get(name:string) : ThemeInterface {
		return this._get(this.themes.value[name] || this.defaultTheme);
	}

	setDefaultTheme(theme:ThemeInterface) {
		if (theme) {
			this.defaultTheme = theme;
		}
	}

	getDefaultTheme() : ThemeInterface {
		return this._get(this.defaultTheme);
	}

	private _get(theme:ThemeInterface) : ThemeInterface {
		var obj = {};
		for (let i in theme) {
			obj[i] = "".concat(theme[i]);
		}
		return obj as ThemeInterface;
	}
}