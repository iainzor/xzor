import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {UINavItemInterface} from "./ui-nav-item.interface";

@Injectable()
export class UINavService
{
	subNav:BehaviorSubject<UINavItemInterface[]> = new BehaviorSubject<UINavItemInterface[]>([]);

	setSubNav(items:UINavItemInterface[]) {
		this.subNav.next(items);
	}

	clearSubNav() {
		this.subNav.next([]);
	}
}