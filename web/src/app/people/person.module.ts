import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";
import {PagePersonComponent} from "./page-person/page-person.component";
import {PersonResolver} from "./person.resolver";
import {PeopleService} from "./people.service";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: "", component: PagePersonComponent, resolve: { person: PersonResolver } }
		]),

		UIModule
	],
	declarations: [
		PagePersonComponent
	],
	exports: [
		PagePersonComponent
	],
	providers: [
		PeopleService,
		PersonResolver
	]
})
export class PersonModule
{}