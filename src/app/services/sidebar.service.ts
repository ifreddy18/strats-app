import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public sidebar;

	constructor() { }

	toggleSidebar(): void {
		this.sidebar.classList.toggle('active');
	}

}
