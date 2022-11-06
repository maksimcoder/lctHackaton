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

export interface IGenerationLoadResponse {
	id: string;
	loaded: number;
}

export interface IGeneratorParams {
	type: string;
	lung: string;
	lobe: string;
	count: string;
	size_mm: string;
	id: string;
	capture: number;
}
