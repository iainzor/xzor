import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";

@Injectable()
export class AppService
{
	loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	setLoading(flag:boolean) {
		this.loading.next(flag);
	}
}