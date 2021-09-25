import { Component, Input, OnInit } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

interface SidebarItemNode {
	name: string;
	url?: string;
	icon?: string;
	children?: SidebarItemNode[];
}

interface ExampleFlatNode {
	expandable: boolean;
	name: string;
	level: number;
}

const TREE_DATA: SidebarItemNode[] = [
	{
		name: 'Dashboard',
		icon: 'dashboard',
		url: 'dashboard'
	},
	{
		name: 'Activities',
		icon: 'timeline',
		url: 'dashboard/activities'
	},
	// {
	// 	name: 'Actividades',
	// 	icon: 'menu',
	// 	children: [
	// 		{
	// 			name: 'Green',
	// 			children: [
	// 				{ name: 'Broccoli' },
	// 				{ name: 'Brussels sprouts' },
	// 			]
	// 		}, {
	// 			name: 'Orange',
	// 			children: [
	// 				{ name: 'Pumpkins' },
	// 				{ name: 'Carrots' },
	// 			]
	// 		},
	// 	]
	// },
];



@Component({
	selector: 'app-sidebar-tree',
	templateUrl: './sidebar-tree.component.html',
	styleUrls: ['./sidebar-tree.component.scss']
})
export class SidebarTreeComponent {

	private transformer = (node: SidebarItemNode, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level,
			icon: node.icon,
			url: node.url
		};
	}

	// tslint:disable-next-line: member-ordering
	public treeControl = new FlatTreeControl<ExampleFlatNode>(
		node => node.level,
		node => node.expandable
	);

	// tslint:disable-next-line: member-ordering
	public treeFlattener = new MatTreeFlattener(
		this.transformer,
		node => node.level,
		node => node.expandable,
		node => node.children
	);

	// tslint:disable-next-line: member-ordering
	public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


	constructor(
		private router: Router,
		private sidebarSerive: SidebarService
	) {
		this.dataSource.data = TREE_DATA;
	}

	hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

	navigateTo(url: string): void {
		this.sidebarSerive.toggleSidebar();
		this.router.navigateByUrl(url);
	}

}
