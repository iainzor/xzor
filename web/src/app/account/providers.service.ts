import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription, Observable} from "rxjs";

import {XzorService} from "../xzor/xzor.service";
import {ProviderInterface} from "./provider.interface";
import {ProviderSessionInterface} from "./provider-session.interface";
import {ProviderVerifiedInterface} from "./provider-verified.interface";

interface ProviderSessionMap
{
	[name:string]: ProviderSessionInterface;
}

@Injectable()
export class ProvidersService
{
	all:BehaviorSubject<ProviderInterface[]> = new BehaviorSubject<ProviderInterface[]>([]);

	private providers:{[name:string]: ProviderInterface} = {};
	private sessions:ProviderSessionMap = {};
	private sessionsSubject:BehaviorSubject<ProviderSessionMap> = new BehaviorSubject<ProviderSessionMap>(this.sessions);

	constructor(
		private Xzor:XzorService
	) {}

	subscribe(onNext:(sessions:ProviderSessionMap) => void) : Subscription {
		return this.sessionsSubject.subscribe(onNext);
	}

	registerProvider(provider:ProviderInterface) {
		this.providers[provider.name] = provider;

		let all = Object.keys(this.providers).map((name) => this.providers[name]);
		this.all.next(all);

		provider.subscribe((session) => {
			let current = this.sessions[provider.name] || { isValid: false };

			if (current.isValid && !current.isVerified) {
				this.verify(provider).then((verified) => {
					this.sessions[provider.name].isVerified = verified.isValid;
					this.sessionsSubject.next(this.sessions);
				});
			} else {
				this.sessions[provider.name] = current;
				this.sessionsSubject.next(this.sessions);
			}
		});
	}

	signOut() {
		let promises:Promise<any>[] = [];
		for (let name in this.providers) {
			let promise = this.providers[name].signOut();
			promises.push(promise);
		}

		let obserable = Observable.forkJoin(...promises);
		let sub = obserable.subscribe((null), null, () => {
			for (let name in this.sessions) {
				let session = this.sessions[name];
				session.isValid = session.isVerified = false;
			}
			this.sessionsSubject.next(this.sessions);
			sub.unsubscribe();
		});
	}

	verify(provider:ProviderInterface) : Promise<ProviderVerifiedInterface> {
		let data = provider.verificationData();
		
		return this.Xzor.post("account/verify/"+ provider.slug +".json", JSON.stringify(data));
	}
}