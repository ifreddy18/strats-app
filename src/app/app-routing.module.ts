import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{ path: '**', pathMatch: 'full', redirectTo: 'dashboard'},

];

@NgModule({
	imports: [
		PagesRoutingModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
