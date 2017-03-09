import {NgModule} from "@angular/core";

import {ThemeBackgroundDirective} from "./theme-background.directive";
import {ThemeBorderDirective} from "./theme-border.directive";
import {ThemeColorDirective} from "./theme-color.directive";

@NgModule({
	declarations: [
		ThemeBackgroundDirective,
		ThemeBorderDirective,
		ThemeColorDirective
	],
	exports: [
		ThemeBackgroundDirective,
		ThemeBorderDirective,
		ThemeColorDirective
	]
})
export class DirectivesModule
{}