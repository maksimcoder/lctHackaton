import { API_BASE } from './const';
import StorageService from './StorageService';
import {
	Endpoints,
	Errors,
	Tokens,
	ILoginResponse,
	IResult,
	IGenerationLoadResponse,
	IGeneratorParams,
} from './types';

const useApi = () => {
	const access_token = StorageService.getTokens(Tokens.access) || '';

	function createJSONRefreshBody(tokenName: Tokens, tokenValue: string) {
		const body = { [tokenName]: tokenValue };
		return JSON.stringify(body);
	}

	function checkAuth() {
		if (access_token) {
			return true;
		}
		return false;
	}

	async function createFetch(endpoint: Endpoints, options?: RequestInit) {
		if (!endpoint) {
			throw new Error(Errors.NoEndpointProvided);
		}

		const headers: HeadersInit = new Headers(options?.headers);

		if (endpoint !== ('generation/load/' as Endpoints)) {
			headers.set('Content-Type', 'application/json');
		}

		headers.append('Authorization', `Bearer ${access_token}`);

		const req = await fetch(`${API_BASE}${endpoint}`, {
			...options,
			headers,
		});

		return req;
	}

	async function logIn(login: string, password: string): Promise<IResult> {
		const body = { login, password };
		const res = await createFetch(Endpoints.Login, {
			method: 'POST',
			body: JSON.stringify(body),
		});
		if (res.status === 400) {
			throw new Error(Errors.InvalidLogin);
		}
		const JWTTokens: ILoginResponse = await res.json();
		StorageService.setTokens(JWTTokens);

		return {
			code: res.status,
			message: 'Login successful',
		};
	}

	async function logOut(): Promise<IResult> {
		const body = createJSONRefreshBody(
			Tokens.refresh,
			StorageService.getTokens(Tokens.refresh) as string
		);
		const res = await createFetch(Endpoints.Logout, {
			method: 'POST',
			body: body,
		});
		return {
			code: res.status,
			message: 'Logout successful',
		};
	}

	async function refresh() {
		const body = createJSONRefreshBody(
			Tokens.refresh,
			StorageService.getTokens(Tokens.refresh) as string
		);
		const res = await createFetch(Endpoints.Refresh, {
			method: 'POST',
			body,
		});
		const JWTTokens = await res.json();
		StorageService.setTokens(JWTTokens);
		return {
			code: res.status,
			message: 'refresh successful',
		};
	}

	async function loadGeneration(File: File): Promise<IGenerationLoadResponse> {
		const formData = new FormData();

		formData.append('files', File);

		const req = await createFetch(
			`${Endpoints.Generation}${Endpoints.GenerationLoad}` as Endpoints,
			{
				method: 'POST',
				body: formData,
			}
		);

		const requestResult = await req.json();
		return requestResult;
	}

	async function postGeneratorParams(params: IGeneratorParams) {
		const { id, capture, ...other } = params;
		const req = await createFetch(
			`${Endpoints.Generation}${id}/captures/${capture}/generate` as Endpoints,
			{
				method: 'POST',
				body: JSON.stringify(other),
			}
		);
		const requestResult = await req.json();
		return requestResult;
	}

	return {
		logIn,
		logOut,
		refresh,
		checkAuth,
		loadGeneration,
		postGeneratorParams,
	};
};

export { useApi };
