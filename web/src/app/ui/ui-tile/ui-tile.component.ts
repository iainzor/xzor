import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

import {ThemeInterface} from "../theme.interface";

@Component({
	selector: "ui-tile",
	templateUrl: "./ui-tile.component.html",
	styleUrls: ["./ui-tile.component.css"],
	host: {
		"(mouseenter)": "z = 3",
		"(mouseleave)": "z = 1",
		"(mousedown)": "z = 5",
		"(mouseup)": "z = 3"
	}
})
export class UITileComponent
{
	@Input() cardTheme:ThemeInterface;
	@Input() image:string;
	@Input() link:any;

	z:number = 1;

	constructor(private Router:Router) {}
}