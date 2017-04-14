import {Injectable, NgZone} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../../account/auth.service";
import {ProviderInterface} from "../../account/provider.interface";
import {ProviderSessionInterface} from "../../account/provider-session.interface";
import {environment} from "../../../environments/environment";

@Injectable()
export class GoogleAuthService implements ProviderInterface
{
	name:string = "google";

	private auth:gapi.auth2.GoogleAuth;
	private session:ProviderSessionInterface;
	private sessionSubject:Subject<ProviderSessionInterface> = new Subject<ProviderSessionInterface>();

	constructor(
		private NgZone:NgZone
	) {
		gapi.load("auth2", () => {
			this.auth = gapi.auth2.init({
				client_id: environment.googleAuthClientId
			});

			this.auth.then(this.check.bind(this));
			this.auth.isSignedIn.listen(this.check.bind(this));
		});
	}

	private check() {
		this.NgZone.run(() => {
			this.session = {
				isValid: this.auth.isSignedIn.get()
			};
			this.sessionSubject.next(this.session);
		});
	}
	
	subscribe(onNext:((provider:ProviderSessionInterface) => void)) : Subscription {
		let sub = this.sessionSubject.subscribe(onNext);
		if (this.session) {
			this.sessionSubject.next(this.session);
		}
		return sub;
	}

	verificationData() {
		let user = this.auth.currentUser.get();
		let response = user.getAuthResponse();

		if (!response.id_token) {
			throw("No reponse token has been retrieved");
		}

		return {
			token: response.id_token
		}
	}

	signIn() {
		this.auth.signIn();
	}

	signOut() {
		this.auth.signOut();
	}
}