import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {PeopleComponent} from "./people.component";
import {ListComponent} from "./list.component";
import {PeopleResolver} from "../../people/people.resolver";
import {PeopleService} from "../../people/people.service";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: PeopleComponent,
				children: [
					{ path: "", component: ListComponent, resolve: { people: PeopleResolver } }
				]
			}
		]),

		UIModule
	],
	declarations: [
		PeopleComponent,
		ListComponent
	],
	providers: [
		PeopleResolver,
		PeopleService
	]
})
export class PeopleModule
{}