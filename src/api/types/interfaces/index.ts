export interface IResult {
	code: number;
	message: string;
	error?: string;
}

export interface ILoginResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	token_type: string;
}
