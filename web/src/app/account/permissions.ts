import {PermissionsResponseInterface} from "./permissions-response.interface";
import {PermissionInterface} from "./permission.interface";
import {ResourcePermissionsInterface} from "./resource-permissions.interface";

export class Permissions
{
	private permissions:ResourcePermissionsInterface;

	constructor(response:PermissionsResponseInterface, resource:string) {
		this.permissions = response[resource] || {
			allowAll: false,
			permissions: {}
		};
	}

	isAllowed(path:string) : boolean {
		return this.permissions[path] 
			? this.permissions[path] 
			: this.permissions.allowAll;
	}
}