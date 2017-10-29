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
		"(mouseup)": "z = 3",
		"(click)": "onClick($event)",
		"[class.clickable]": "link"
	}
})
export class UITileComponent
{
	@Input() theme:ThemeInterface;
	@Input() image:string;
	@Input() link:any;

	z:number = 1;

	constructor(private Router:Router) {}

	onClick(e:MouseEvent) {
		if (this.link) {
			e.preventDefault();
			this.Router.navigate(this.link);
		}
	}
}