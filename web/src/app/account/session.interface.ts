import {AccountInterface} from "./account.interface";

export interface SessionInterface
{
	isValid:boolean;
	account?:AccountInterface;
}