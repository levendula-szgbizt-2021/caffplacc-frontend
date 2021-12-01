import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { JWTResponse } from "../shared/models/auth.model";

const ACCESS_TOKEN_KEY = 'auth-token-caffplacc';
const REFRESH_TOKEN_KEY = 'auth-refresh-token-caffplacc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private tokenService : TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY)

        if (accessToken) {
            const cloned = (req.url.includes('/api/auth/refresh'))?req: req.clone({ headers: req.headers.set("Authorization", "Bearer " + accessToken)});
            return next.handle(cloned).pipe(catchError((err: HttpErrorResponse) => {
                if ([401].includes(err.status) && refreshToken) {
                    if(err.url?.includes('/api/auth/refresh')){
                        alert("Your session has expired, please login again to use the portal.")
                        this.authService.logout();
                        return throwError(err); //Ha a refresh token failelt el akkor vége
                    }

                    return this.authService.getNewToken({refreshToken}).pipe(switchMap((data: JWTResponse) =>{
                        this.tokenService.saveToken(data.token);
                        return next.handle(req.clone({ headers: req.headers.set("Authorization", "Bearer " + this.tokenService.getToken())}));
                    }))
                }
                return throwError(err);
            }
        ))}
        else {
            return next.handle(req);
        }
    }
}