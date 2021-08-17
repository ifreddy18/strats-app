export interface UserModel {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	profile_medium: string;
	profile: string;
	date_preference: string; //"%m/%d/%Y"
	measurement_preference: string;
}