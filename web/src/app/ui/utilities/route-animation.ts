import {animate, trigger, transition, style, state} from "@angular/core";

export function routeAnimation(name:string) {
	return trigger(name, [
		transition(":enter", [
			style({
				opacity: 0,
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				zIndex: 1
			}),
			animate("0.3s 0.2s ease-in-out", style({
				opacity: 1,
				transform: "translateY(0)"
			}))
		]),
		transition(":leave", [
			style({
				zIndex: 0,
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%"
			}),
			animate("0.2s ease-in-out", style({
				opacity: 0
			}))
		])
	]);
}
