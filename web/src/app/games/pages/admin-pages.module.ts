import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameFeedManagerModule} from "../game-feed-manager/game-feed-manager.module";
import {GameFormModule} from "../game-form/game-form.module";
import {GameFeedProvidersResolver} from "../game-feed-providers.resolver";
import {AdminComponent} from "./admin/admin.component";
import {IndexComponent} from "./admin/index.component";
import {FeedsComponent} from "./admin/feeds.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: AdminComponent,
				children: [
					{ path: "", component: IndexComponent },
					{ path: "feeds", component: FeedsComponent, resolve: { providers: GameFeedProvidersResolver } }
				]
			}
		]),

		UIModule,
		GameFeedManagerModule,
		GameFormModule
	],
	declarations: [
		AdminComponent,
		IndexComponent,
		FeedsComponent
	],
	providers: [
		GameFeedProvidersResolver
	]
})
export class GameAdminPagesModule
{}