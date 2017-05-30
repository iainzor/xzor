import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {AccountService} from "./account/account.service";

@Injectable()
export class AppService
{
	loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private Account:AccountService
	) {
		Account.load();
	}

	setLoading(flag:boolean) {
		this.loading.next(flag);
	}
}