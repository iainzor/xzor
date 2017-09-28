import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {ThemeInterface} from "../theme.interface";
import {ThemesService} from "../themes.service";

@Component({
	selector: "ui-theme-editor",
	templateUrl: "./ui-theme-editor.component.html",
	styleUrls: ["./ui-theme-editor.component.css"]
})
export class UIThemeEditorComponent implements OnInit, OnDestroy
{
	private themesSub:Subscription;

	@Input() model:ThemeInterface;
	@Output() modelChange:EventEmitter<ThemeInterface> = new EventEmitter<ThemeInterface>();

	constructor(private Themes:ThemesService) {}

	ngOnInit() {
		this.themesSub = this.Themes.subscribe(() => {
			if (!this.model) {
				setTimeout(() => {
					this.model = this.Themes.getDefaultTheme();
					this.modelChange.emit(this.model);
				});
			}
		});
	}

	ngOnDestroy() {
		this.themesSub.unsubscribe();
	}
}