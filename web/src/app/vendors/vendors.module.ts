import {NgModule} from "@angular/core";

import {GoogleModule} from "./google/google.module";
import {RedditModule} from "./reddit/reddit.module";
import {TwitchModule} from "./twitch/twitch.module";

@NgModule({
	imports: [
		GoogleModule,
		RedditModule,
		TwitchModule
	],
	exports: [
		GoogleModule,
		RedditModule,
		TwitchModule
	]
})
export class VendorsModule
{}