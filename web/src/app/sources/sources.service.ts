import {Injectable} from "@angular/core";
import {Subscription, BehaviorSubject} from "rxjs";

import {XzorService} from "../xzor/xzor.service";
import {SourceInterface} from "./source.interface";

@Injectable()
export class SourcesService
{
	private subject:BehaviorSubject<SourceInterface[]> = new BehaviorSubject<SourceInterface[]>([]);
	
	constructor(private Xzor:XzorService) {}

	subscribe(onNext:((sources:SourceInterface[]) => void)) : Subscription {
		if (this.subject.observers.length === 0) {
			this.load().then((sources) => {
				this.subject.next(sources);
			});
		}
		return this.subject.subscribe(onNext);
	}

	load() : Promise<SourceInterface[]> {
		return new Promise<SourceInterface[]>((resolve, reject) => {
			this.Xzor
				.get("sources.json")
				.then((sources) => {
					resolve(sources);
				});
		});
	}
}