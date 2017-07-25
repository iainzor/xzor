import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule, ErrorHandler} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AccountService} from "./account/account.service";
import {AccountResolver} from "./account/account.resolver";
import {ProvidersService} from "./account/providers.service";
import {AccountModule} from "./account/account.module";
import {FeedComponentsService} from "./feed/feed-components.service";
import {ImagesService} from "./images/images.service";
import {NotificationsService} from "./notifications/notifications.service";
import {GamesModule} from "./games/games.module";
import {AppComponent} from "./app.component";
import {AppMenuComponent} from "./app-menu.component";
import {AppService} from "./app.service";
import {AppErrorHandler} from "./app-error-handler";
import {ThemesService} from "./ui/themes.service";
import {UIModule} from "./ui/ui.module";
import {VendorsModule} from "./vendors/vendors.module";
import {XzorModule} from "./xzor/xzor.module";
import {XzorService} from "./xzor/xzor.service";

@NgModule({
	declarations: [
		AppComponent,
		AppMenuComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([
			{ path: "", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
			{ path: "account", loadChildren: "./account/account.module#AccountModule", resolve: { account: AccountResolver } },
			{ path: "games", loadChildren: "./games/games.module#GamesModule" },
			{ path: "g/:slug", loadChildren: "./games/game.module#GameModule" },
			{ path: "people", loadChildren: "./people/people.module#PeopleModule" },
			{ path: "p/:slug", loadChildren: "./people/person.module#PersonModule" },
			{ path: "teams", loadChildren: "./teams/teams.module#TeamsModule" },
			{ path: "sources", loadChildren: "./sources/sources.module#SourcesModule" }
		]),

		UIModule,
		VendorsModule,
		XzorModule
	],
	providers: [
		AppService,
		AppErrorHandler,
		AccountService,
		AccountResolver,
		FeedComponentsService,
		ImagesService,
		NotificationsService,
		ProvidersService,
		ThemesService,
		XzorService,
		{ provide: ErrorHandler, useClass: AppErrorHandler }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
