import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {PersonComponent} from "./person.component";
import {IndexComponent} from "./index.component";
import {PersonResolver} from "../../people/person.resolver";
import {PeopleService} from "../../people/people.service";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: PersonComponent,
				resolve: { person: PersonResolver },
				children: [
					{ path: "", component: IndexComponent }
				]
			}
		]),

		UIModule
	],
	declarations: [
		PersonComponent,
		IndexComponent
	],
	providers: [
		PersonResolver,
		PeopleService
	]
})
export class PersonModule
{}