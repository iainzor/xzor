import {Directive, ElementRef, OnInit, OnDestroy, OnChanges} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ThemeService} from "../theme.service";
import {ThemeInterface} from "../theme.interface";

export abstract class AbstractThemeDirective implements OnInit, OnDestroy, OnChanges
{
	private theme:ThemeInterface;
	private themeSub:Subscription;
	private elRef:ElementRef;
	private Themes:ThemeService;

	customTheme:ThemeInterface;

	constructor(elRef:ElementRef, Themes:ThemeService) {
		this.elRef = elRef;
		this.Themes = Themes;
	}

	ngOnInit() {
		this.themeSub = this.Themes.subscribe((theme) => {
			this.theme = theme;
			this.adjust(this.customTheme || theme);
		});
	}

	ngOnDestroy() {
		this.themeSub.unsubscribe();
	}

	ngOnChanges() {
		this.adjust(this.customTheme || this.theme || {
			background: null,
			border: null,
			color: null
		});
	}

	style(styles:{[name:string]: any}) {
		let element:HTMLElement = this.elRef.nativeElement;

		for (let name in styles) {
			element.style[name] = styles[name];
		}
	}

	abstract adjust(theme:ThemeInterface);
}