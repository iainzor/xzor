import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {BehaviorSubject, Subscription} from "rxjs";
import {AccountService} from "./account/account.service";

@Injectable()
export class AppService
{
	private append:string = "xZor - Gamer Community";

	loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private Account:AccountService,
		private Title:Title
	) {
		Account.load();
	}

	setLoading(flag:boolean) {
		this.loading.next(flag);
	}
	
	setPageTitle(title:string, replace:boolean = false) {
		if (replace === true) {
			this.Title.setTitle(title);
		} else {
			this.Title.setTitle(title +" - "+ this.append);
		}
	}

	resetPageTitle() {
		this.Title.setTitle(this.append);
	}
}