import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AccountService} from "./account/account.service";
import {ProvidersService} from "./account/providers.service";
import {AccountModule} from "./account/account.module";
import {GamesModule} from "./games/games.module";
import {AppComponent} from "./app.component";
import {AppService} from "./app.service";
import {ThemeService} from "./ui/theme.service";
import {UIModule} from "./ui/ui.module";
import {VendorsModule} from "./vendors/vendors.module";
import {XzorModule} from "./xzor/xzor.module";
import {XzorService} from "./xzor/xzor.service";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([
			{ path: "", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
			{ path: "account", loadChildren: "./account/account.module#AccountModule" },
			{ path: "games", loadChildren: "./games/games.module#GamesModule" },
			{ path: "gamers", loadChildren: "./gamers/gamers.module#GamersModule" },
			{ path: "teams", loadChildren: "./teams/teams.module#TeamsModule" },
			{ path: "sources", loadChildren: "./sources/sources.module#SourcesModule" }
		]),

		UIModule,
		VendorsModule,
		XzorModule
	],
	providers: [
		AppService,
		AccountService,
		ProvidersService,
		ThemeService,
		XzorService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
