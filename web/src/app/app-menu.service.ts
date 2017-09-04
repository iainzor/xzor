import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {AppMenuComponent} from "./app-menu.component";

@Injectable()
export class AppMenuService
{
	private _isOpen:boolean = false;

	isOpen:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	component:AppMenuComponent;

	open() {
		this._isOpen = true;
		this.isOpen.next(true);
	}

	close() {
		this._isOpen = false;
		this.isOpen.next(false);
	}

	toggle() {
		if (this._isOpen) {
			this.close();
		} else {
			this.open();
		}
	}
}