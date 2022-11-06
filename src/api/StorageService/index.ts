import { Errors, Tokens, ILoginResponse } from '../types';

class StorageService {
	private _access_token: string;
	private _refresh_token: string;
	private _expires: number;

	constructor() {
		this._access_token = '';
		this._refresh_token = '';
		this._expires = 0;
	}

	private setLocalStorageTokens() {
		localStorage.setItem(Tokens.access, this._access_token);
		localStorage.setItem(Tokens.refresh, this._refresh_token);
		localStorage.setItem(Tokens.expires, String(this._expires));
	}

	public setTokens(tokens: ILoginResponse) {
		if (!tokens.access_token || !tokens.refresh_token) {
			throw new Error(Errors.NoTokenProvided);
		}

		this._access_token = tokens.access_token;
		this._refresh_token = tokens.refresh_token;
		this._expires = tokens.expires_in;
		this.setLocalStorageTokens();
	}

	public getTokens(token?: string) {
		if (!token) {
			const dataObject = {
				access_token: localStorage.getItem(Tokens.access),
				refresh_token: localStorage.getItem(Tokens.refresh),
				expires: localStorage.getItem(Tokens.expires),
			};
			return dataObject;
		}

		return localStorage.getItem(token);
	}
}

export default new StorageService();
