import {Injectable} from "@angular/core";
import {Subscription, ReplaySubject} from "rxjs";

import {XzorService} from "../xzor/xzor.service";
import {SourceInterface} from "./source.interface";
import {SourceService} from "./source.service";

@Injectable()
export class SourcesService
{
	private loading:boolean = false;
	private sources:SourceInterface[];
	private subject:ReplaySubject<SourceInterface[]> = new ReplaySubject<SourceInterface[]>(1);
	
	constructor(private Xzor:XzorService) {}

	subscribe(onNext:((sources:SourceInterface[]) => void)) : Subscription {
		if (!this.sources && !this.loading) {
			this.loading = true;
			this.load().then((sources) => {
				this.sources = sources;
				this.loading = false;
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

	getSourceService(slug:string) : Promise<SourceService> {
		return new Promise<SourceService>((resolve, reject) => {
			var sub = this.subscribe((sources) => {
				sources.forEach((source) => {
					if (source.slug === slug) {
						resolve(this.createSourceService(source));
					}
				});
				setTimeout(() => { sub.unsubscribe() });
			});
		});
	}

	createSourceService(source:SourceInterface) : SourceService {
		return new SourceService(source, this.Xzor);
	}
}