import {Directive, Input, ElementRef} from "@angular/core";
import {ThemeInterface} from "../theme.interface";
import {ThemeService} from "../theme.service";
import {AbstractThemeDirective} from "./abstract-theme-directive";

@Directive({
	selector: "[theme-border],[themeBorder]"
})
export class ThemeBorderDirective extends AbstractThemeDirective
{
	@Input("themeBorder") customTheme:ThemeInterface;

	constructor(elRef:ElementRef, theme:ThemeService) {
		super(elRef, theme);
	}

	adjust(theme:ThemeInterface) {
		this.style({
			borderColor: theme.border
		});
	}
}