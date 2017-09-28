import {Component, Input} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
	selector: "ui-icon",
	templateUrl: "./ui-icon.component.html",
	styleUrls: ["./ui-icon.component.css"],
	animations: [
		trigger("primaryTrigger", [
			state("visible", style({
				opacity: 1,
				transform: "rotate(0)"
			})),
			state("hidden", style({
				opacity: 0,
				transform: "rotate(180deg)"
			})),
			transition("hidden <=> visible", animate(".2s ease-in-out"))
		]),
		trigger("secondaryTrigger", [
			state("visible", style({
				opacity: 1,
				transform: "rotate(0)"
			})),
			state("hidden", style({
				opacity: 0,
				transform: "rotate(-180deg)"
			})),
			transition("hidden <=> visible", animate(".2s ease-in-out"))
		])
	]
})
export class UIIconComponent
{
	primary:string;
	primaryState:string = "visible";

	secondary:string;
	secondaryState:string = "hidden";

	@Input() size:number = 24;

	@Input() set icon(icon:string) {
		if (!this.primary) {
			this.primary = icon;
		} else if (!this.secondary) {
			this.secondary = icon;
			this.primaryState = "hidden";
			this.secondaryState = "visible";
		} else {
			this.secondary = null;
			this.primary = icon;
			this.primaryState = "visible";
			this.secondaryState = "hidden";
		}
	}
}