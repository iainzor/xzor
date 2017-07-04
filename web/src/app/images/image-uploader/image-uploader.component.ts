import {Component, Output, EventEmitter} from "@angular/core";

import {ImagesService} from "../images.service";
import {ImageInterface} from "../image.interface";

@Component({
	selector: "image-uploader",
	templateUrl: "./image-uploader.component.html",
	styleUrls: ["./image-uploader.component.css"],
	host: {
		"[class.is-loading]": "uploading"
	}
})
export class ImageUploaderComponent
{
	uploading:boolean = false;

	@Output() image:EventEmitter<ImageInterface> = new EventEmitter<ImageInterface>();

	constructor(private Images:ImagesService) {}

	onFileSelected(file:File) {
		this.uploading = true;
		this.Images.upload(file).then((image) => {
			this.image.emit(image);
			this.uploading = false;
		});
	}
}