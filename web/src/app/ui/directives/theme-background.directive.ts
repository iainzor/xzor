import {Directive, Input, ElementRef} from "@angular/core";
import {ThemeInterface} from "../theme.interface";
import {ThemeService} from "../theme.service";
import {AbstractThemeDirective} from "./abstract-theme-directive";

@Directive({
	selector: "[theme-background],[themeBackground]"
})
export class ThemeBackgroundDirective extends AbstractThemeDirective
{
	@Input("themeBackground") set _custom(value:string) {
		this.customTheme["background"] = value;
		this.update();
	}

	constructor(elRef:ElementRef, theme:ThemeService) {
		super(elRef, theme);
	}

	adjust(theme:ThemeInterface) {
		this.style({
			background: theme ? theme.background : null
		});
	}
}