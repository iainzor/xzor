import {animate, transition, trigger, style, state} from "@angular/animations";
import {Component, Input} from "@angular/core";

import {Feed} from "../feed";
import {FeedItemInterface} from "../feed-item.interface";

@Component({
	selector: "feed-quilt",
	templateUrl: "./feed-quilt.component.html",
	styleUrls: ["./feed-quilt.component.css"],
	animations: [
		trigger("feedItem", [
			transition(":enter", [
				style({
					transform: "scale(.5)",
					opacity: 0
				}),
				animate(".3s ease-in-out", style({
					transform: "scale(1)",
					opacity: 1
				}))
			]),
			transition(":leave", [
				animate(".3s ease-in-out", style({
					transform: "scale(.5)",
					opacity: 0
				}))
			])
		])
	]
})
export class FeedQuiltComponent
{
	feed:Feed;
	items:FeedItemInterface<any>[] = [];

	@Input("feed") set _feed(feed:Feed) {
		this.feed = feed;
		if (feed) {
			this.staggerItems(feed.results);
		}
	}

	private staggerItems(items:FeedItemInterface<any>[]) {
		this.items = [];

		let delay = 10;
		let totalDelay = 0;
		let maxDelay = 500;

		items.forEach((item) => {
			setTimeout(() => {
				this.items.push(item);
			}, totalDelay);

			if (totalDelay < maxDelay) {
				totalDelay += delay;
			}
		});
	}

}