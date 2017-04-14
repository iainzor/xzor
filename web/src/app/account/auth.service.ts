import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {XzorService} from "../xzor/xzor.service";
import {SessionInterface} from "./session.interface";
import {ProviderInterface} from "./provider.interface";
import {ProviderSessionInterface} from "./provider-session.interface";

@Injectable()
export class AuthService
{
	private session:SessionInterface = {
		isValid: false,
		providers: {}
	};
	private sessionSubject:BehaviorSubject<SessionInterface> = new BehaviorSubject<SessionInterface>(this.session);

	loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	constructor(
		private Xzor:XzorService
	) {}

	registerProvider(provider:ProviderInterface) {
		this.loading.next(true);

		provider.subscribe((session) => {
			this.loading.next(false);

			let current = this.session.providers[provider.name];

			if (current === undefined || session.isValid !== current.isValid) {
				current = session;

				if (current.isValid) {
					this.loading.next(true);
					this.verify(provider).then((verified) => {
						if (verified.isValid && verified.account) {
							this.session.isValid = true;
							this.session.account = verified.account;
							this.session.providers[provider.name] = verified;
						}
						this.sessionSubject.next(this.session);
						this.loading.next(false);
					});
				} else {
					this.session.isValid = false;
				}
			}

			this.session.providers[provider.name] = current || { isValid: false };
			this.sessionSubject.next(this.session);
		});
	}

	subscribe(onNext:(session:SessionInterface) => void) : Subscription {
		return this.sessionSubject.subscribe(onNext);
	}

	private verify(provider:ProviderInterface) : Promise<ProviderSessionInterface> {
		let data = provider.verificationData();
		
		return this.Xzor.post("account/verify/"+ provider.name +".json", JSON.stringify(data));
	}
}