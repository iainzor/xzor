import {Injectable} from "@angular/core";
import {Subscription, BehaviorSubject} from "rxjs";
import {ProviderInterface} from "../../account/provider.interface";
import {ProviderSessionInterface} from "../../account/provider-session.interface";

@Injectable()
export class TwitchAuthService implements ProviderInterface
{
	private session:ProviderSessionInterface = { isValid: false };
	private sessionSubject:BehaviorSubject<ProviderSessionInterface> = new BehaviorSubject<ProviderSessionInterface>(this.session);
	
	name:string = "twitch";

	subscribe(onNext:(session:ProviderSessionInterface) => void) : Subscription {
		return this.sessionSubject.subscribe(onNext);
	}

	verificationData() {
		return {};
	}
}