export interface LoginRequest{
	username: string,
	password: string,
}

export interface LoginResponse{
	token: string,
	refreshToken: string,
	userId: string;
	username: string;
	roles: string[];
}

export interface JWTResponse{
	token: string,
	refreshToken: string,
	userId: string;
	username: string;
	roles: string[];
}
export interface RegisterRequest{
	username: string,
	password: string,
	email:string,
}

export interface UpdateProfileRequest{
	username: string,
	password: string,
	email:string,
}

export interface UpdateProfilResponse{
	username: string,
	password: string,
	email:string,
}

