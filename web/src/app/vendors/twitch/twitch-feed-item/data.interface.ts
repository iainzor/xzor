interface PreviewDataInterface
{
	small:string;
	medium:string;
	large:string;
	template:string;
}

export interface DataInterface
{
	displayName:string;
	preview:PreviewDataInterface;
	viewers:number;
	game:string;
}