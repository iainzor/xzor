import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";

import {SourcesService} from "./sources.service";
import {SourceResolver} from "./source.resolver";
import {SourcesResolver} from "./sources.resolver";
import {SourcesComponent} from "./sources.component";
import {SourceComponent} from "./source.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: "", component: SourcesComponent, resolve: 
				{ sources: SourcesResolver }
			},
			{ path: ":slug", component: SourceComponent, resolve: 
				{ source: SourceResolver }
			}
		]),

		UIModule,
		XzorModule
	],
	declarations: [
		SourcesComponent,
		SourceComponent
	],
	providers: [
		SourceResolver,
		SourcesResolver,
		SourcesService
	]
})
export class SourcesModule
{}