import { API_BASE } from './const';
import StorageService from './StorageService';
import { Endpoints, Errors, Tokens, ILoginResponse, IResult } from './types';

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

		const headers: HeadersInit = new Headers();

		headers.set('Content-Type', 'application/json');
		headers.set('Authorization', `Bearer ${access_token}`);

		const req = await fetch(`${API_BASE}${endpoint}`, {
			headers,
			...options,
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
		// access_token = StorageService.getTokens(Tokens.access)!;
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

	return {
		logIn,
		logOut,
		refresh,
		checkAuth,
	};
};

export { useApi };
