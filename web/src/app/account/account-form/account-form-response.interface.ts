import {AccountInterface} from "../account.interface";

export interface AccountFormResponseInterface
{
	isValid:boolean;
	errors?:{[field:string]:string};
	account:AccountInterface;
}