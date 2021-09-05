export interface UserModel {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	profile_medium: string;
	profile: string;
	date_preference: string; //"%m/%d/%Y"
	measurement_preference: string;
	created_at: string;
}

export interface Distance {
	distance: number;
	id: number;
	start_date_local: string;
}
