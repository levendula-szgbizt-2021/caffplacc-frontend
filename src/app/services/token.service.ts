import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token-caffplacc';
const REFRESH_KEY = 'auth-refresh-token-caffplacc';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESH_KEY);
    window.localStorage.setItem(REFRESH_KEY, token);
  }

  public signOut(): void {
    localStorage.clear();
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

}
