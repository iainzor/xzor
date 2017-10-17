import {TeamSettingDefinitionOption} from "./team-setting-definition-option";

export interface TeamSettingDefinition
{
	key:string;
	label:string;
	description:string;
	defaultValue:any;
	fieldType:string;
	options:TeamSettingDefinitionOption[];
	conditions:{[key:string]:any};
	isRequired:boolean;
	isPublic:boolean;
}