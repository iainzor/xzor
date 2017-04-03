import {Injectable, NgZone} from "@angular/core";
import {ReplaySubject, Subscription} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class GoogleAuthService
{
	private auth:gapi.auth2.GoogleAuth;

	user:ReplaySubject<gapi.auth2.GoogleUser> = new ReplaySubject<gapi.auth2.GoogleUser>(1);

	constructor(private NgZone:NgZone) {
		NgZone.runOutsideAngular(() => {
			gapi.load("auth2", () => {
				this.auth = gapi.auth2.init({
					client_id: environment.googleAuthClientId
				});

				this.auth.then(() => {
					NgZone.run(() => {});
					console.log("Auth Loaded");
				});

				this.auth.isSignedIn.listen((flag) => {
					console.log(flag);
					this.notify(this.auth.currentUser.get());
				});
					
					/*
					this.auth.then(() => {
						let user = this.auth.currentUser.get();
						if (user.isSignedIn()) {
							this.notify(user);
						}

						
					});
					*/
			});
		});
	}

	private notify(user:gapi.auth2.GoogleUser) {
		this.user.next(user);
	}

	signOut() {
		this.auth.signOut();
	}
}