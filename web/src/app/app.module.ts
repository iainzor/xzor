import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AccountService} from "./account/account.service";
import {AccountModule} from "./account/account.module";
import {AppComponent} from "./app.component";
import {AppService} from "./app.service";
import {ThemeService} from "./ui/theme.service";
import {UIModule, UINavService} from "./ui/ui.module";
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
			{ path: "games", loadChildren: "./games/games.module#GamesModule" }
		]),

		AccountModule,
		UIModule,
		VendorsModule,
		XzorModule
	],
	providers: [
		AppService,
		ThemeService,
		UINavService,
		XzorService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
