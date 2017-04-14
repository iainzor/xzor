import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../account/auth.service";
import {TwitchAuthService} from "./twitch-auth.service";
import {TwitchSignInComponent} from "./twitch-sign-in/twitch-sign-in.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		TwitchSignInComponent
	],
	providers: [
		TwitchAuthService
	],
	exports: [
		TwitchSignInComponent
	]
})
export class TwitchModule
{
	constructor(Auth:AuthService, TwitchAuth:TwitchAuthService) {
		Auth.registerProvider(TwitchAuth);
	}
}
