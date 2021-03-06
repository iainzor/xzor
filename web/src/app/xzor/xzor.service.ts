import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class XzorService
{
	constructor(private http:Http) {}

	private url(uri:string) : string {
		return environment.xzorApiUrl +"/"+ uri;
	}

	get(uri:string, params:URLSearchParams = null) : Promise<any> {
		let url = this.url(uri);
		return new Promise<any>((resolve, reject) => {
			this.http
				.get(url, { search: params })
				.subscribe(
					(response) => { resolve(response.json()); },
					(error) => { reject(error.json ? error.json() : error); }
				);
		});
	}

	post(uri:string, data:any = "") : Promise<any> {
		let url = this.url(uri);

		return new Promise<any>((resolve, reject) => {
			this.http
				.post(url, data)
				.map(res => res.json())
				.subscribe(
					(response) => { resolve(response); },
					(error) => { reject(error.json ? error.json() : error); }
				);
		});
	}
}