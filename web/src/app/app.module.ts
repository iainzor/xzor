import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {UIModule} from "./ui/ui.module";
import {AppComponent} from "./app.component";
import {AppNavComponent} from "./app-nav.component";
import {ThemeService} from "./ui/theme.service";
import {ApiService} from "./xzor/api.service";

@NgModule({
	declarations: [
		AppComponent,
		AppNavComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([
			{ path: "", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
			{ path: "account", loadChildren: "./account/account.module#AccountModule" },
			{ path: "games", loadChildren: "./games/games.module#GamesModule" }
		]),

		UIModule
	],
	providers: [
		ApiService,
		ThemeService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
