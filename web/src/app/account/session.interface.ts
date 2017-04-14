import {AccountInterface} from "./account.interface";
import {ProviderSessionInterface} from "./provider-session.interface";

export interface SessionInterface
{
	isValid:boolean;
	account?:AccountInterface;
	providers?:{[name:string]:ProviderSessionInterface};
}