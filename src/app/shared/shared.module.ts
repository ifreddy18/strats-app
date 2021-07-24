import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SidebarTreeComponent } from './sidebar-tree/sidebar-tree.component';

@NgModule({
	declarations: [
		SidebarTreeComponent
	],
	imports: [
		CommonModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule
	],
	exports: [
		SidebarTreeComponent
	]
})
export class SharedModule { }
