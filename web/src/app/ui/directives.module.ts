import {NgModule} from "@angular/core";

import {ThemeDirective} from "./directives/theme.directive";
import {ThemeBackgroundDirective} from "./directives/theme-background.directive";
import {ThemeColorDirective} from "./directives/theme-color.directive";

import {ZDirective} from "./directives/z.directive";

@NgModule({
	declarations: [
		ThemeDirective,
		ThemeBackgroundDirective,
		ThemeColorDirective,
		ZDirective
	],
	exports: [
		ThemeDirective,
		ThemeBackgroundDirective,
		ThemeColorDirective,
		ZDirective
	]
})
export class DirectivesModule
{}