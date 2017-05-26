import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ThemeService} from "../theme.service";
import {ThemeInterface} from "../theme.interface";

@Component({
	selector: "ui-card",
	templateUrl: "./ui-card.component.html",
	styleUrls: ["./ui-card.component.css"],
	host: {
		"[style.background]": "theme?.background",
		"[style.color]": "theme?.text",
		"[style.fill]": "theme?.text"
	}
})
export class UICardComponent
{
	@Input() theme:ThemeInterface;
}