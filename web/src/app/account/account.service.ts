import {Injectable} from "@angular/core";
import {Subscription, Subject, ReplaySubject} from "rxjs";
import {XzorService} from "../xzor/xzor.service";
import {AppService} from "../app.service";
import {AccountInterface} from "./account.interface";
import {ProvidersService} from "./providers.service";

@Injectable()
export class AccountService
{
	private account:AccountInterface;
	private accountSubject:ReplaySubject<AccountInterface> = new ReplaySubject<AccountInterface>(1);
	
	constructor(
		private Xzor:XzorService,
		private Providers:ProvidersService
	) {}

	load() : Promise<AccountInterface> {
		let promise = this.Xzor.get("account.json");
		promise.then((account:AccountInterface) => {
			this.account = account;
			this.accountSubject.next(account);

			if (!account.isValid) {
				this.Providers.signOut();
			}
		});

		return promise;
	}

	subscribe(onNext:((account:AccountInterface) => void)) : Subscription {
		let sub = this.accountSubject.subscribe(onNext);

		if (this.account) {
			this.accountSubject.next(this.account);
		}

		return sub;
	}

	signOut() : Promise<AccountInterface> {
		let promise = this.Xzor.post("sign-out.json", "");
		promise.then((account) => {
			this.account = account;
			this.accountSubject.next(account);
		});

		return promise;
	}
}