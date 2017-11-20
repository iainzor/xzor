import {Component, Input, OnChanges} from "@angular/core";

import {ForumInterface} from "../forum.interface";
import {ForumsService} from "../forums.service";

@Component({
	selector: "forum-overview",
	templateUrl: "forum-overview.component.html"
})
export class ForumOverviewComponent implements OnChanges
{
	@Input() resource:string;
	@Input() resourceId:string;

	forums:ForumInterface[];

	constructor(private Forums:ForumsService) {}

	ngOnChanges() {
		if (this.resource && this.resourceId) {
			this.load();
		}
	}

	load() {
		this.Forums.loadRootForums(this.resource, this.resourceId).then((forums) => {
			this.forums = forums;
		});
	}
}