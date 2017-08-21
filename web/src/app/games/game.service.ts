import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Feed} from "../feed/feed";
import {XzorService} from "../xzor/xzor.service";
import {GameInterface} from "./game.interface";

@Injectable()
export class GameService
{
	private game:GameInterface;
	private routeSub:Subscription;
	private subject:ReplaySubject<GameInterface> = new ReplaySubject<GameInterface>(1);

	constructor(private Xzor:XzorService) {}

	setGame(game:GameInterface) {
		this.game = game;
		this.subject.next(game);
	}

	feed() : Promise<Feed> {
		return new Promise<Feed>((resolve) => {
			this.Xzor
				.get("g/"+ this.game.slug +"/feed.json")
				.then((response) => {
					resolve(
						new Feed(response)
					)
				});
		});
	}

	follow() : Promise<any> {
		return this.Xzor.post("g/"+ this.game.slug +"/follow.json");
	}

	unfollow() : Promise<any> {
		return this.Xzor.post("g/"+ this.game.slug +"/unfollow.json");
	}
	
	subscribe(onNext:((game:GameInterface) => void)) : Subscription {
		let sub = this.subject.subscribe(onNext);
		
		return sub;
	}
}