import {Component, Input, Output, EventEmitter, ElementRef, OnInit} from "@angular/core";

@Component({
	selector: "ui-file-selector",
	templateUrl: "./ui-file-selector.component.html",
	styleUrls: ["./ui-file-selector.component.css"]
})
export class UIFileSelectorComponent implements OnInit
{
	fileId:string = "file";
	file:File;
	imageData:string;
	percent:number = 0;
	
	@Input() accept:string[] = ["*"];
	@Output() data:EventEmitter<string> = new EventEmitter<string>();
	@Output() selected:EventEmitter<File> = new EventEmitter<File>();
	@Output() clear:EventEmitter<any> = new EventEmitter<any>();

	constructor(private ElRef:ElementRef) {}
	
	ngOnInit() {
		this.fileId = "file"+ Math.round(Math.random() * Date.now());
	}

	onFileChange(e:Event) {
		let files:FileList = e.target["files"];
		if (files.length > 0) {
			let file:File = this.file = files[0];
			let reader:FileReader = new FileReader();
			let formData = new FormData();

			reader.addEventListener("progress", this.onProgress.bind(this));
			reader.addEventListener("loadend", this.onLoadEnd.bind(this));
			reader.readAsDataURL(file);

			this.selected.emit(file);
		}
	}

	onProgress(e:ProgressEvent) {
		setTimeout(() => {
			this.percent = (e.loaded / e.total) * 100;
		});
	}

	onLoadEnd(e:ProgressEvent, b) {
		setTimeout(() => {
			let reader = <FileReader> e.currentTarget;
			this.imageData = reader.result;
			this.data.emit(this.imageData);
		});
	}

	clearFile(e:MouseEvent) {
		e.preventDefault();
		this.imageData = null;
		this.file = null;
		this.percent = 0;
		this.data.emit(null);
		this.clear.emit();

		let el:HTMLElement = this.ElRef.nativeElement;
		let file:HTMLInputElement = el.querySelector("#"+ this.fileId) as HTMLInputElement;

		file.value = null;
	}
}