import {SourceInterface} from "../source.interface";

export class SourceSearchResponse
{
	q:string;
	source:SourceInterface;
	results:{[category:string]:any[]};

	constructor(source:SourceInterface, q:string, results:{[category:string]:any[]}) {
		this.source = source;
		this.q = q;
		this.results = results;

		for (let slug in this.results) {
			this.results[slug].forEach((item) => {
				if (!item.theme) {
					item.theme = source.theme;
				}
			});
		}
	}

	get totalResults() : number {
		let count = 0;
		for (let cat in this.results) {
			count += this.results[cat].length;
		}
		return count;
	}

	get hasResults() : boolean {
		return this.totalResults > 0;
	}
}