import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../account/auth.service";
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
	constructor(Auth:AuthService, GoogleAuth:GoogleAuthService) {
		console.log("Constructed module");
		
		Auth.registerProvider(GoogleAuth);
	}
}