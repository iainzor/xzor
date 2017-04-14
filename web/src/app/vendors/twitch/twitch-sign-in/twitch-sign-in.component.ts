import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {TwitchAuthService} from "../twitch-auth.service";
import {ProviderSessionInterface} from "../../../account/provider-session.interface";

@Component({
	selector: "twitch-sign-in",
	templateUrl: "./twitch-sign-in.component.html"
})
export class TwitchSignInComponent implements OnInit, OnDestroy
{
	private authSub:Subscription;

	session:ProviderSessionInterface;

	constructor(private Auth:TwitchAuthService) {}

	ngOnInit() {
		this.authSub = this.Auth.subscribe((session) => {
			this.session = session;

			console.log(session);
		});
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}
}