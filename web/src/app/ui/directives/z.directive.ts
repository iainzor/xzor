import {Directive, Input, ElementRef} from "@angular/core";

@Directive({
	selector: "[z]"
})
export class ZDirective
{
	private _z:number = 0;

	constructor(private elRef:ElementRef) {}

	@Input() set z(z:number) {
		this._z = +z;
		this.style();
	}

	private style() {
		let el:HTMLElement = this.elRef.nativeElement;
		let shadow:string;

		switch (this._z) {
			case 1:
				shadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
				break;
			case 2:
				shadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
				break;
			case 3:
				shadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
				break;
			case 4:
				shadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
				break;
			case 5:
				shadow = "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)";
				break;
			case 0:
			default:
				shadow = "none";
		}

		el.style.boxShadow = shadow;
	}
}