import {Injectable} from "@angular/core";
import {XzorService} from "../xzor/xzor.service";
import {ForumInterface} from "./forum.interface";

@Injectable()
export class ForumsService
{
	constructor(private Xzor:XzorService) {}

	loadRootForums(resource:string, resourceId:string) : Promise<ForumInterface[]> {
		return this.Xzor.get("forums/"+ resource +"/"+ resourceId +".json");
	}
}