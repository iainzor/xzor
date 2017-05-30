import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {ProviderSessionInterface} from "../../../account/provider-session.interface";
import {GoogleAuthService} from "../google-auth.service";

@Component({
	selector: "google-sign-in",
	templateUrl: "./google-sign-in.component.html"
})
export class GoogleSignInComponent implements OnInit, OnDestroy
{
	private authSub:Subscription;

	session:ProviderSessionInterface = { isValid: false };

	constructor(private Auth:GoogleAuthService) {}

	signIn(e:MouseEvent) {
		this.Auth.signIn();
	}

	signOut(e:MouseEvent) {
		this.Auth.signOut();
	}

	ngOnInit() {
		this.authSub = this.Auth.subscribe((session) => {
			this.session = session;
		});
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}
}