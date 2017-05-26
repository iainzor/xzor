import {NgModule} from "@angular/core";

import {ThemeBackgroundDirective} from "./directives/theme-background.directive";
import {ThemeColorDirective} from "./directives/theme-color.directive";

import {ZDirective} from "./directives/z.directive";

@NgModule({
	declarations: [
		ThemeBackgroundDirective,
		ThemeColorDirective,
		ZDirective
	],
	exports: [
		ThemeBackgroundDirective,
		ThemeColorDirective,
		ZDirective
	]
})
export class DirectivesModule
{}