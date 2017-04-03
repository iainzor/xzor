import {Injectable, NgZone} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {GoogleAuthService} from "../vendors/google/google-auth.service";
import {XzorService} from "../xzor/xzor.service";
import {SessionInterface} from "./session.interface";

@Injectable()
export class AuthService
{
	session:Subject<SessionInterface> = new Subject<SessionInterface>();

	constructor(
		private NgZone:NgZone,
		
		private Xzor:XzorService,
		private GoogleAuth:GoogleAuthService
	) {
		GoogleAuth.user.subscribe((user) => {
			NgZone.run(() => {
				this.onGoogleUser(user);
			});
		});
	}

	private onGoogleUser(user:gapi.auth2.GoogleUser) {
		if (user.isSignedIn()) {
			let token = user.getAuthResponse().id_token;

			this.verify(token, "google").then((session) => {
				this.session.next(session)
			});
		} else {
			this.session.next({
				isValid: false
			});
		}
	}

	private verify(token:string, service:string) : Promise<SessionInterface> {
		return this.Xzor.post("account/verify/"+ service +".json", JSON.stringify({
			token: token
		}));
	}
}