import {Injectable, ApplicationRef} from "@angular/core";
import {Subscription, Subject, BehaviorSubject} from "rxjs";
import {XzorService} from "../xzor/xzor.service";
import {AppService} from "../app.service";
import {AccountInterface} from "./account.interface";
import {AuthService} from "./auth.service";

@Injectable()
export class AccountService
{
	private account:AccountInterface;
	private accountSubject:Subject<AccountInterface> = new Subject<AccountInterface>();
	
	loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	constructor(
		private App:AppService,
		private Auth:AuthService,
		private Xzor:XzorService
	) {
		Auth.session.subscribe((session) => {
			this.loading.next(false);

			if (session.isValid) {
				this.account = session.account;
				this.accountSubject.next(this.account);
			}
		});
	}

	subscribe(onNext:((account:AccountInterface) => void)) : Subscription {
		let sub = this.accountSubject.subscribe(onNext);

		if (this.account) {
			this.accountSubject.next(this.account);
		}

		return sub;
	}
}