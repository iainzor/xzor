import {Component, Input} from "@angular/core";
import {animate, keyframes, trigger, transition, state, style} from "@angular/animations";

const animation:string = "2s ease-in-out";

@Component({
	selector: "xzor-logo",
	templateUrl: "./xzor-logo.component.html",
	styleUrls: ["./xzor-logo.component.css"],
	host: {
		"[style.width.px]": "size",
		"[style.height.px]": "size",
		"[class.spin]": "spinning"
	},
	animations: [
		trigger("rotateAll", [
			state("on", style({})),
			state("off", style({})),

			transition("* => on", [
				animate(animation, keyframes([
					style({ transform: "rotate(0deg)", offset: 0 }),
					style({ transform: "rotate(180deg)", offset: .5 }),
					style({ transform: "rotate(360deg)", offset: 1 })
				]))
			])
		]),
		trigger("movementA", [
			state("on", style({})),
			state("off", style({})),
			
			transition("* => on", [
				animate(animation, keyframes([
					style({ transform: "translate(0,0)", offset: 0 }),
					style({ transform: "translate(-125px, 125px)", offset: .5 }),
					style({ transform: "translate(0,0)", offset: 1 })
				]))
			])
		]),
		trigger("movementB", [
			state("on", style({})),
			state("off", style({})),
			
			transition("* => on", [
				animate(animation, keyframes([
					style({ transform: "translate(0,0)", offset: 0 }),
					style({ transform: "translate(175px, -175px)", offset: .5 }),
					style({ transform: "translate(0,0)", offset: 1 })
				]))
			])
		])
	]
})
export class XzorLogoComponent
{
	transitioning:boolean = false;
	spinning:boolean = false;
	spinningState:string = "off";

	@Input() size:number = 100;
	
	@Input("spinning") set _spinning(spinning:boolean) {
		if (spinning) {
			this.spinning = true;
			this.spinningState = "on";
		} else {
			this.spinning = false;
		}
	}

	onSpinStart(e) {
		this.transitioning = true;
	}

	onSpinDone(e) {
		if (this.spinning) {
			this.spinningState = "off";
			setTimeout(() => {
				this.spinningState = "on";
			});
		} else {
			this.transitioning = false;
			this.spinningState = "off";
		}
	}
}