import {Component, Input} from "@angular/core";

import {ThemeInterface} from "../theme.interface";

@Component({
	selector: "ui-header",
	templateUrl: "./ui-header.component.html",
	styleUrls: ["./ui-header.component.css"]
})
export class UIHeaderComponent
{
	@Input() theme:ThemeInterface;
}