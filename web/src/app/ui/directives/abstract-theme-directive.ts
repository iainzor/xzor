import {Directive, ElementRef, OnInit, OnDestroy, OnChanges} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ThemeService} from "../theme.service";
import {ThemeInterface} from "../theme.interface";

export abstract class AbstractThemeDirective implements OnInit, OnDestroy
{
	private theme:ThemeInterface;
	private themeSub:Subscription;
	private elRef:ElementRef;
	private Themes:ThemeService;

	customTheme:any = {};

	constructor(elRef:ElementRef, Themes:ThemeService) {
		this.elRef = elRef;
		this.Themes = Themes;
	}

	ngOnInit() {
		this.themeSub = this.Themes.subscribe((theme) => {
			this.theme = theme;
			this.update();
		});
	}

	ngOnDestroy() {
		this.themeSub.unsubscribe();
	}

	update() {
		let newTheme:any = {};
		for (let key in this.theme) {
			newTheme[key] = this.customTheme[key] || this.theme[key];
		}
		this.adjust(newTheme);
	}

	style(styles:{[name:string]: any}) {
		let element:HTMLElement = this.elRef.nativeElement;

		for (let name in styles) {
			element.style[name] = styles[name];
		}
	}

	abstract adjust(theme:ThemeInterface);
}