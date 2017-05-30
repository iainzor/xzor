import {Injectable, NgZone} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {ProviderInterface} from "../../account/provider.interface";
import {ProviderSessionInterface} from "../../account/provider-session.interface";
import {environment} from "../../../environments/environment";

@Injectable()
export class GoogleAuthService implements ProviderInterface
{
	slug:string = "google";
	name:string = "Google";
	theme = {
		background: "#2196F3",
		text: "#fff"
	};

	private auth:gapi.auth2.GoogleAuth;
	private session:ProviderSessionInterface = { isValid: false, isVerified: false };
	private sessionSubject:BehaviorSubject<ProviderSessionInterface> = new BehaviorSubject<ProviderSessionInterface>(this.session);

	constructor(
		private NgZone:NgZone
	) {
		gapi.load("auth2", () => {
			this.auth = gapi.auth2.init({
				client_id: environment.googleAuthClientId
			});

			this.auth.then(() => {
				this.check();
				this.auth.isSignedIn.listen(this.check.bind(this));
			});
		});
	}

	private check() {
		let signedIn = this.auth.isSignedIn.get();

		this.NgZone.run(() => {
			this.session.isValid = signedIn;

			if (!signedIn) {
				this.session.isVerified = false;
			}
			this.sessionSubject.next(this.session);
		});
	}
	
	subscribe(onNext:((provider:ProviderSessionInterface) => void)) : Subscription {
		return this.sessionSubject.subscribe(onNext);
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

	signIn() : Promise<ProviderSessionInterface> {
		return new Promise<ProviderSessionInterface>((resolve) => {
			let signedIn = this.auth.isSignedIn.get();
			if (signedIn && this.session.isValid) {
				resolve(this.session);
			} else {
				this.auth.isSignedIn.listen((signedIn) => {
					this.session.isValid = signedIn;
					resolve(this.session);
				});
				this.auth.signIn();
			}
		});
	}

	signOut() : Promise<any> {
		return new Promise<any>((resolve) => {
			let sub = this.subscribe((session) => {
				if (session.isValid) {
					this.auth.signOut()
				}
				if (sub) {
					sub.unsubscribe();
				}
				resolve();
			});
		});
	}
}