import {Component, Input, Output, EventEmitter} from "@angular/core";

import {ThemeInterface} from "../theme.interface";
import {DefaultTheme} from "../default-theme";

@Component({
	selector: "ui-theme-editor",
	templateUrl: "./ui-theme-editor.component.html",
	styleUrls: ["./ui-theme-editor.component.css"]
})
export class UIThemeEditorComponent
{
	@Input() model:ThemeInterface = new DefaultTheme();
	@Output() modelChange:EventEmitter<ThemeInterface> = new EventEmitter<ThemeInterface>();
}