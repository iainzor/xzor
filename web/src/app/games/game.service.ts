import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {XzorService} from "../xzor/xzor.service";
import {GameInterface} from "./game.interface";

@Injectable()
export class GameService
{
	private routeSub:Subscription;
	private subject:ReplaySubject<GameInterface> = new ReplaySubject<GameInterface>(1);

	constructor(private Xzor:XzorService) {}

	load(slug:string) : Promise<GameInterface> {
		let promise = new Promise<GameInterface>((resolve, reject) => {
			this.Xzor
				.get("games/"+ slug +".json")
				.then((game) => { 
					resolve(game);
				});
		});
		promise.then((game) => { this.subject.next(game); });

		return promise;
	}
	
	subscribe(onNext:((game:GameInterface) => void)) : Subscription {
		let sub = this.subject.subscribe(onNext);
		
		return sub;
	}
}