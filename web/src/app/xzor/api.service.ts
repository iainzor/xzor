import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService
{
	constructor(private http:Http) {}

	private url(uri:string) : string {
		return environment.xzorApiUrl +"/"+ uri;
	}

	get(uri:string) : Promise<any> {
		let url = this.url(uri);
		return new Promise<any>((resolve, reject) => {
			this.http
				.get(url)
				.subscribe(
					(response) => { resolve(response.json()); },
					(error) => { reject(error.json ? error.json() : error); }
				);
		});
	}
}