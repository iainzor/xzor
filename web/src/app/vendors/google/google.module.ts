import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProvidersService} from "../../account/providers.service";
import {GoogleAuthService} from "./google-auth.service";
import {GoogleSignInComponent} from "./google-sign-in/google-sign-in.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		GoogleSignInComponent
	],
	exports: [
		GoogleSignInComponent
	],
	providers: [
		GoogleAuthService
	]
})
export class GoogleModule
{
	constructor(Providers:ProvidersService, GoogleAuth:GoogleAuthService) {
		Providers.registerProvider(GoogleAuth);
	}
}