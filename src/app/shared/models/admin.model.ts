import { Paged } from "./animation.model";

export interface UserCreateUpdateRequest{
	username:string | null,
	password:string | null,
	email:string | null,
	admin:boolean,
}

export interface AdminUserResponse{
	username:string,
	email:string,
	id:string,
	admin: boolean,
}

export type UserListResponse = Paged<AdminUserResponse>