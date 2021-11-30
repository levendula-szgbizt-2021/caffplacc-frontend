import { Paged } from "./animation.model";

export interface UserCreateUpdateRequest{
	username:string,
	password:string,
	email:string,
	admin:boolean,
}

export interface UserResponse{
	username:string,
	email:string,
	id:string,
}

export type UserListResponse = Paged<UserResponse>