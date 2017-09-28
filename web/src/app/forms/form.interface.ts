import {FieldInterface} from "./field.interface";

export interface FormInterface<D>
{
	data:D;
	fields:{[name:string]:FieldInterface};
	isValid:boolean;
}