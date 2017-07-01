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
	private themes:BehaviorSubject<ThemeMap> = new BehaviorSubject({
		notice: { background: "#00BCD4", text: "#fff" }
	});

	subscribe(onNext:(ThemeMap) => void) : Subscription {
		return this.themes.subscribe(onNext);
	}

	get(name:string) : ThemeInterface {
		return this.themes.value[name] || null;
	}
}