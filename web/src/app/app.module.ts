import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {UIModule, UINavService} from "./ui/ui.module";
import {AppComponent} from "./app.component";
import {AppService} from "./app.service";
import {ThemeService} from "./ui/theme.service";
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
			{ path: "games", loadChildren: "./games/games.module#GamesModule" }
		]),

		UIModule,
		XzorModule
	],
	providers: [
		AppService,
		ThemeService,
		XzorService,
		UINavService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
