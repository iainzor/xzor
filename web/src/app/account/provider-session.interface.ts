import {AccountInterface} from "./account.interface";

export interface ProviderSessionInterface
{
	isValid:boolean;
	account?:AccountInterface;
}