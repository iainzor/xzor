import {Directive, Input, ElementRef} from "@angular/core";
import {ThemeInterface} from "../theme.interface";
import {ThemeService} from "../theme.service";
import {AbstractThemeDirective} from "./abstract-theme-directive";

@Directive({
	selector: "[theme-color],[themeColor]"
})
export class ThemeColorDirective extends AbstractThemeDirective
{
	@Input("themeColor") set _custom(value:any) {
		if  (value !== null && typeof value === "object") {
			value = value["text"];
		}
		this.customTheme["text"] = value;
		this.update();	
	}

	constructor(elRef:ElementRef, theme:ThemeService) {
		super(elRef, theme);
	}

	adjust(theme:ThemeInterface) {
		this.style({
			color: theme ? theme.text : null,
			fill: theme ? theme.text : null
		});
	}
}