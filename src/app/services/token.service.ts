import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token-caffplacc';
const REFRESH_KEY = 'auth-refresh-token-caffplacc';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_KEY);
    window.sessionStorage.setItem(REFRESH_KEY, token);
  }

  public signOut(): void {
    sessionStorage.clear();
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(){
    return window.sessionStorage.getItem(REFRESH_KEY)
  }

}
