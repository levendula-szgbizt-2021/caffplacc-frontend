import { Paged } from "./animation.model";

export interface UserCreateUpdateRequest{
	username:string,
	password:string,
	email:string,
	admin:boolean,
}

export interface AdminUserResponse{
	username:string,
	email:string,
	id:string,
	admin: boolean,
}

export type UserListResponse = Paged<AdminUserResponse>