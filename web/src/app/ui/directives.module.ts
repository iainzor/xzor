import {NgModule} from "@angular/core";

import {ThemeBackgroundDirective} from "./directives/theme-background.directive";
import {ThemeBorderDirective} from "./directives/theme-border.directive";
import {ThemeColorDirective} from "./directives/theme-color.directive";

import {ZDirective} from "./directives/z.directive";

@NgModule({
	declarations: [
		ThemeBackgroundDirective,
		ThemeBorderDirective,
		ThemeColorDirective,
		ZDirective
	],
	exports: [
		ThemeBackgroundDirective,
		ThemeBorderDirective,
		ThemeColorDirective,
		ZDirective
	]
})
export class DirectivesModule
{}