import {PermissionsResponseInterface} from "./permissions-response.interface";
import {PermissionInterface} from "./permission.interface";
import {ResourcePermissionsInterface} from "./resource-permissions.interface";

export class Permissions
{
	private resource:ResourcePermissionsInterface;

	constructor(response:PermissionsResponseInterface, resource:string) {
		this.resource = response[resource] || {
			allowAll: false,
			permissions: {}
		};
	}

	isAllowed(path:string) : boolean {
		return this.resource.permissions[path] 
			? this.resource.permissions[path].isAllowed 
			: this.resource.allowAll;
	}
}