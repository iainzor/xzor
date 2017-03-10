import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {ApiService} from "../xzor/api.service";
import {GameInterface} from "./game.interface";

@Injectable()
export class GameService
{
	private routeSub:Subscription;
	private subject:ReplaySubject<GameInterface> = new ReplaySubject<GameInterface>(1);

	constructor(private xzor:ApiService, private route:ActivatedRoute) {
		this.routeSub = this.route.params.subscribe((params) => {
			this.load(params["slug"]).then((game) => {
				this.subject.next(game);	
			});
		});
	}

	private load(slug:string) : Promise<GameInterface> {
		return new Promise<GameInterface>((resolve, reject) => {
			this.xzor
				.get("games/"+ slug +".json")
				.then((game) => { 
					resolve(game); 
				});
		});
	}
	
	subscribe(onNext:((game:GameInterface) => void)) : Subscription {
		let sub = this.subject.subscribe(onNext);
		
		return sub;
	}
}