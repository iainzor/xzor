import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {UIModule} from "../ui/ui.module";

import {PeopleResolver} from "./people.resolver";
import {PeopleService} from "./people.service";
import {PagePeopleComponent} from "./page-people/page-people.component";

import {PersonTileModule} from "./person-tile/person-tile.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: "", component: PagePeopleComponent, resolve: { people: PeopleResolver } }
		]),
		UIModule,

		PersonTileModule
	],
	declarations: [
		PagePeopleComponent
	],
	providers: [
		PeopleService,
		PeopleResolver
	]
})
export class PeopleModule
{}