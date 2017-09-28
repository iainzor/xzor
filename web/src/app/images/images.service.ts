import {Injectable} from "@angular/core";

import {XzorService} from "../xzor/xzor.service";
import {ImageInterface} from "./image.interface";

@Injectable()
export class ImagesService
{
	constructor(private Xzor:XzorService) {}

	upload(file:File) : Promise<ImageInterface> {
		let data:FormData = new FormData();
		data.append("file", file, file.name);

		console.log(file, data.get("file"));

		return new Promise<ImageInterface>((resolve, reject) => {
			this.Xzor.post("img/upload.json", data)
				.then((image) => {
					resolve(image);
				}).catch((error) => {
					reject(error);	
				});
		});
	}
}