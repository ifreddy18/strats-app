import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'pace'
})
export class PacePipe implements PipeTransform {

	transform(averageSpeed): unknown {
		const minutes = ( 1 / averageSpeed ) * 1000 / 60;
		const seconds = Math.floor( (minutes - Math.floor(minutes)) * 60 );
		const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();

		return `${ Math.floor(minutes) }:${ secondsString }`;
	}

}
