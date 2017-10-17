import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";

@Component({
	selector: "team-setting",
	templateUrl: "./team-setting.component.html"
})
export class TeamSettingComponent
{
	@Input() definition:any;
	@Input() value:any;
	@Output() valueChange:EventEmitter<any> = new EventEmitter<any>();

	onChange(value) {
		this.value = value;
		this.valueChange.emit(value);
	}
}