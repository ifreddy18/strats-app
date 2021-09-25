import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration'
})
export class DurationPipe implements PipeTransform {

	transform(seconds: number): string {
		return `${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}min`;
	}

}
