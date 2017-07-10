import {Injectable} from "@angular/core";

@Injectable()
export class FeedComponentsService
{
	private components:{[slug:string]:any} = {};

	register(slug:string, component:any) {
		this.components[slug] = component;
	}

	get(slug:string) : any {
		if (!this.components[slug]) {
			throw("Could not find component for '"+ slug +"'");
		}
		return this.components[slug];
	}
}