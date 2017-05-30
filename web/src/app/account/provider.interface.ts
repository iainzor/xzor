import {Subject, Subscription} from "rxjs";

import {ThemeInterface} from "../ui/theme.interface";
import {ProviderSessionInterface} from "./provider-session.interface";


export interface ProviderInterface
{
	slug:string;
	name:string;
	theme?:ThemeInterface;

	signIn() : Promise<ProviderSessionInterface>;

	signOut() : Promise<any>;
	
	subscribe(onNext:(session:ProviderSessionInterface) => void) : Subscription;
	
	verificationData() : {[key:string]:any};
}