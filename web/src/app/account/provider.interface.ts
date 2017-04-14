import {Subject, Subscription} from "rxjs";
import {ProviderSessionInterface} from "./provider-session.interface";

export interface ProviderInterface
{
	name:string;

	subscribe(onNext:(session:ProviderSessionInterface) => void) : Subscription;
	verificationData() : {[key:string]:any};
}