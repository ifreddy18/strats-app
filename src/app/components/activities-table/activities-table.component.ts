import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
	selector: 'app-activities-table',
	templateUrl: './activities-table.component.html',
	styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent implements OnChanges, AfterViewInit {

	@Input() activities;
	@ViewChild(MatTable) table;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	public columnsToDisplay = ['date', 'title', 'duration', 'distance', 'elevation_gain'];
	public dataSource;

	constructor(
		private cdr: ChangeDetectorRef,
		private router: Router
	) { }

	ngAfterViewInit(): void {
		this.dataSource = new MatTableDataSource(this.activities);
		this.dataSource.paginator = this.paginator;
		this.cdr.detectChanges();
	}

	ngOnChanges(): void {
		if (this.table) {this.table.renderRows(); }
	}

	viewActivity(id: number): void {
		this.router.navigateByUrl(`dashboard/activity/${id}`);
	}

}
