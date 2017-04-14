import {Injectable} from "@angular/core";
import {Subscription, Subject, BehaviorSubject} from "rxjs";
import {XzorService} from "../xzor/xzor.service";
import {AppService} from "../app.service";
import {AccountInterface} from "./account.interface";
import {AuthService} from "./auth.service";

@Injectable()
export class AccountService
{
	private account:AccountInterface = { isValid: false };
	private accountSubject:BehaviorSubject<AccountInterface> = new BehaviorSubject<AccountInterface>(this.account);
	
	loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	constructor(
		private App:AppService,
		private Auth:AuthService,
		private Xzor:XzorService
	) {
		Auth.subscribe((session) => {
			console.log("Auth session change", session);
			
			if (session.isValid) {
				this.account = session.account;
			} else {
				this.account = { isValid: false };
			}
			this.accountSubject.next(this.account);
		});
		Auth.loading.subscribe((flag) => {
			this.loading.next(flag);
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