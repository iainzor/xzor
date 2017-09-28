import {FormInterface} from "../../forms/form.interface";
import {TeamInterface} from "../team.interface";

interface DataInterface
{
	team:TeamInterface;
}

export interface TeamFormInterface extends FormInterface<DataInterface>
{}