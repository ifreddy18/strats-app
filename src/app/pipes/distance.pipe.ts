import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'distance'
})
export class DistancePipe implements PipeTransform {

	transform(distance: number): number | string {
		return distance > 0 ? (distance / 1000).toFixed(2) : '-';
	}

}
