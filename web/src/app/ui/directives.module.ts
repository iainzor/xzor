import {NgModule} from "@angular/core";

import {ThemeDirective} from "./directives/theme.directive";
import {ZDirective} from "./directives/z.directive";

@NgModule({
	declarations: [
		ThemeDirective,
		ZDirective
	],
	exports: [
		ThemeDirective,
		ZDirective
	]
})
export class DirectivesModule
{}