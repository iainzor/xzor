import {Directive, Input, ElementRef} from "@angular/core";
import {ThemeInterface} from "../theme.interface";
import {ThemeService} from "../theme.service";
import {AbstractThemeDirective} from "./abstract-theme-directive";

@Directive({
	selector: "[theme-color],[themeColor]"
})
export class ThemeColorDirective extends AbstractThemeDirective
{
	@Input("themeColor") customTheme:ThemeInterface;

	constructor(elRef:ElementRef, theme:ThemeService) {
		super(elRef, theme);
	}

	adjust(theme:ThemeInterface) {
		this.style({
			color: theme.color,
			fill: theme.color
		});
	}
}