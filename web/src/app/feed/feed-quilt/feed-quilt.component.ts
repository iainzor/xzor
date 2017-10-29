import {animate, transition, trigger, style, state, query, stagger} from "@angular/animations";
import {Component, Input} from "@angular/core";

import {Feed} from "../feed";
import {FeedItemInterface} from "../feed-item.interface";

@Component({
	selector: "feed-quilt",
	templateUrl: "./feed-quilt.component.html",
	animations: [
		trigger("feedItem", [
			transition("* => *", [
				query(":enter", [
					style({
						opacity: 0,
						transform: "scale(.5)"
					}),
					stagger(10, [
						animate(".2s ease-in-out", style({
							opacity: 1,
							transform: "scale(1)"
						}))
					])
				], { optional: true }),
				query(":leave", [
					stagger(10, [
						animate(".2s ease-in-out", style({
							opacity: 0,
							transform: "scale(.5)"
						}))
					])
				], { optional: true })
			])
		])
	]
})
export class FeedQuiltComponent
{
	@Input() feed:Feed;
}