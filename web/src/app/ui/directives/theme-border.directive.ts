import {Directive, ElementRef, OnInit, OnDestroy} from "@angular/core";
import {ThemeInterface} from "../theme.interface";
import {ThemeService} from "../theme.service";
import {AbstractThemeDirective} from "./abstract-theme-directive";

@Directive({
	selector: "[theme-border]"
})
export class ThemeBorderDirective extends AbstractThemeDirective
{
	constructor(elRef:ElementRef, theme:ThemeService) {
		super(elRef, theme);
	}

	adjust(theme:ThemeInterface) {
		this.style({
			borderColor: theme.borderColor
		});
	}
}