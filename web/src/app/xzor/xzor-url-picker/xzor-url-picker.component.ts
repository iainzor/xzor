import {Component, Input, Output, EventEmitter} from "@angular/core";
import {environment} from "../../../environments/environment";

@Component({
	selector: "xzor-url-picker",
	templateUrl: "./xzor-url-picker.component.html"
})
export class XzorURLPickerComponent
{
	@Input() section:string = "";
	@Input() error:string;
	@Input() uri:string = "";
	@Output() uriChange:EventEmitter<string> = new EventEmitter<string>();

	@Input() set watch(value:string) {
		if (value) {
			this.onChange(value);
		}
	};

	get url() : string {
		let uri = this.uri || "...";
		if (this.section.length > 0) {
			uri = this.clean(this.section) + "/"+ uri;
		}

		return environment.domain +"/"+ uri;
	}

	onChange(uri:string) {
		setTimeout(() => {
			this.uri = this.clean(uri);
			this.uriChange.emit(this.uri);
		});
	}

	private clean(uri:string) : string {
		return uri ? uri.replace(/[^a-z0-9-_]+/ig, "-").toLowerCase() : "";
	}
}