import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProvidersService} from "../../account/providers.service";
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
	constructor(Providers:ProvidersService, TwitchAuth:TwitchAuthService) {
		Providers.registerProvider(TwitchAuth);
	}
}
