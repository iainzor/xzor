import {NgModule} from "@angular/core";

import {GoogleModule} from "./google/google.module";
//import {TwitchModule} from "./twitch/twitch.module";

@NgModule({
	imports: [
		GoogleModule,
		//TwitchModule
	],
	exports: [
		GoogleModule,
		//TwitchModule
	]
})
export class VendorsModule
{}