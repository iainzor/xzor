import {PermissionInterface} from "./permission.interface";

export interface ResourcePermissionsInterface
{
	allowAll:boolean;

	permissions:{[path:string]:PermissionInterface};
}