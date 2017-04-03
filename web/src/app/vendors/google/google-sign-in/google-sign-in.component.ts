import {Component, NgZone, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit} from "@angular/core";
import {Subscription} from  "rxjs";
import {GoogleAuthService} from "../google-auth.service";

@Component({
	selector: "google-sign-in",
	templateUrl: "./google-sign-in.component.html"
})
export class GoogleSignInComponent implements OnDestroy, AfterViewInit
{
	private userSub:Subscription;
	
	signedIn:boolean = false;

	@Output() success:EventEmitter<gapi.auth2.AuthResponse> = new EventEmitter<gapi.auth2.AuthResponse>();

	constructor(
		private NgZone:NgZone,

		private Auth:GoogleAuthService
	) {
		this.userSub = this.Auth.user.subscribe((user) => {
			this.signedIn = user.isSignedIn();

			if (this.signedIn) {
				this.success.emit(user.getAuthResponse());
			}
		});
	}

	ngAfterViewInit() {
		this.drawButton();
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}

	drawButton() {
		gapi.signin2.render("google-sign-in-button", {
			longtitle: true
		});
	}

	signOut() {
		this.Auth.signOut();
	}
}