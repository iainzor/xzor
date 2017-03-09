import {Directive, ElementRef, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ThemeService} from "../theme.service";
import {ThemeInterface} from "../theme.interface";

export abstract class AbstractThemeDirective implements OnInit, OnDestroy
{
	private themeSub:Subscription;
	private elRef:ElementRef;
	private theme:ThemeService;

	constructor(elRef:ElementRef, theme:ThemeService) {
		this.elRef = elRef;
		this.theme = theme;
	}

	ngOnInit() {
		this.themeSub = this.theme.subscribe((theme) => {
			this.adjust(theme);
		});
	}

	ngOnDestroy() {
		this.themeSub.unsubscribe();
	}

	style(styles:{[name:string]: any}) {
		let element:HTMLElement = this.elRef.nativeElement;

		for (let name in styles) {
			element.style[name] = styles[name];
		}
	}

	abstract adjust(theme:ThemeInterface);
}