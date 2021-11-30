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

export interface RefreshTokenRequest{
	refreshToken: string;
}

export interface RegisterRequest{
	username: string,
	password: string,
	email:string,
}

export interface UpdateProfileRequest{
	username: string | null,
	password: string | null,
	email:string | null,
}

export interface UpdateProfilResponse{
	username: string,
	password: string,
	email:string,
}

