import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'avgSpeed'
})
export class AvgSpeedPipe implements PipeTransform {

	transform(averageSpeed): unknown {
		return (averageSpeed * 3600 / 1000).toFixed(2);
	}

}
