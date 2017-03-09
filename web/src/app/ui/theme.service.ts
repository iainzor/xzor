import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";

import {ThemeInterface} from "./theme.interface";
import {DefaultTheme} from "./default-theme";

@Injectable()
export class ThemeService
{
	private themeSubject:BehaviorSubject<ThemeInterface> = new BehaviorSubject<ThemeInterface>(new DefaultTheme());

	subscribe(onNext:((theme:ThemeInterface) => void)) : Subscription {
		return this.themeSubject.subscribe(onNext);
	}

	apply(theme:ThemeInterface) {
		this.themeSubject.next(theme);
	}
}