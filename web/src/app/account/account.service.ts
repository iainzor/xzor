import {Injectable} from "@angular/core";
import {Subscription, Subject, ReplaySubject} from "rxjs";
import {XzorService} from "../xzor/xzor.service";
import {AppService} from "../app.service";
import {AccountInterface} from "./account.interface";
import {AccountFormResponseInterface} from "./account-form/account-form-response.interface";
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
		return this.accountSubject.subscribe(onNext);
	}

	signOut() : Promise<any> {
		let promise = this.Xzor.post("sign-out.json", "");
		promise.then(() => {
			this.load();
		});

		return promise;
	}

	update(account:AccountInterface) : Promise<AccountFormResponseInterface> {
		let promise = this.Xzor.post("account/update.json", JSON.stringify({
			name: account.name,
			slug: account.slug,
			isPublic: account.isPublic,
			theme: account.theme,
			data: account.data
		}));
		promise.then((response) => {
			if (response.isValid) {
				this.load();
			};
		});
		return promise;
	}
}