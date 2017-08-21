import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule, ErrorHandler} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AccountService} from "./account/account.service";
import {ProvidersService} from "./account/providers.service";
import {AccountMenuModule} from "./account/account-menu/account-menu.module";
import {FeedComponentsService} from "./feed/feed-components.service";
import {ImagesService} from "./images/images.service";
import {NotificationsService} from "./notifications/notifications.service";
import {AppComponent} from "./app.component";
import {AppNavComponent} from "./app-nav.component";
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
		AppNavComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([
			{ path: "", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
			{ path: "account", loadChildren: "./account/pages/account-pages.module#AccountPagesModule" },
			{ path: "games", loadChildren: "./games/pages/games-pages.module#GamesPagesModule" },
			{ path: "g/:slug", loadChildren: "./games/pages/game-pages.module#GamePagesModule" },
			{ path: "people", loadChildren: "./people/people.module#PeopleModule" },
			{ path: "p/:slug", loadChildren: "./people/person.module#PersonModule" },
			{ path: "teams", loadChildren: "./teams/teams.module#TeamsModule" },
			{ path: "sources", loadChildren: "./sources/sources.module#SourcesModule" }
		]),

		AccountMenuModule,
		UIModule,
		VendorsModule,
		XzorModule
	],
	providers: [
		AppService,
		AppErrorHandler,
		AccountService,
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
