import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameFeedManagerModule} from "../game-feed-manager/game-feed-manager.module";
import {GameFormModule} from "../game-form/game-form.module";
import {AdminComponent} from "./admin/admin.component";
import {IndexComponent} from "./admin/index.component";
import {FeedsComponent} from "./admin/feeds.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ 
				path: "", 
				component: AdminComponent,
				children: [
					{ path: "", component: IndexComponent },
					{ path: "feeds", component: FeedsComponent }
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
	]
})
export class GameAdminPagesModule
{}