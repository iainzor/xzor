import {Directive, Input, ElementRef} from "@angular/core";
import {ThemeInterface} from "../theme.interface";
import {ThemeService} from "../theme.service";
import {AbstractThemeDirective} from "./abstract-theme-directive";

@Directive({
	selector: "[theme]"
})
export class ThemeDirective extends AbstractThemeDirective
{
	@Input("theme") set _custom(theme:ThemeInterface) {
		if (theme !== null) {
			this.customTheme["background"] = theme.background;
			this.customTheme["text"] = theme.text;
		} else {
			this.customTheme = {};
		}
		this.update();
	}

	constructor(elRef:ElementRef, theme:ThemeService) {
		super(elRef, theme);
	}

	adjust(theme:ThemeInterface) {
		this.style({
			background: theme ? theme.background : null,
			color: theme ? theme.text : null
		});
	}
}