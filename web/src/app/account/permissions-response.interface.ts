import {ResourcePermissionsInterface} from "./resource-permissions.interface";

export interface PermissionsResponseInterface
{
	[resource:string]:ResourcePermissionsInterface;
}