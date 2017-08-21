import {Component, Input} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
	selector: "ui-icon",
	templateUrl: "./ui-icon.component.html",
	styleUrls: ["./ui-icon.component.css"],
	animations: [
		trigger("previous", [
			state("out", style({
				opacity: 0,
				transform: "scale(.5)"
			})),
			transition("* => out", [
				style({
					opacity: 1,
					transform: "none"
				}),
				animate(".2s")
			]),
			transition("out => *", [])
		]),
		trigger("icon", [
			state("in", style({
				opacity: 1,
				transform: "none"
			})),
			transition("* => in", [
				style({
					opacity: 0,
					transform: "scale(.5)"
				}),
				animate(".2s")
			]),
			transition("in => *", [])
		])
	]
})
export class UIIconComponent
{
	@Input() icon:string;
	@Input() size:number = 24;
}