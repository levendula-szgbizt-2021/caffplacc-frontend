import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { JWTResponse, RefreshTokenRequest } from "../shared/models/auth.model";

const ACCESS_TOKEN_KEY = 'auth-token-caffplacc';
const REFRESH_TOKEN_KEY = 'auth-refresh-token-caffplacc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private tokenService : TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

        if (accessToken) {
            const cloned = req.clone({ headers: req.headers.set("Authorization", "Bearer " + accessToken)});
            return next.handle(cloned).pipe(catchError((err) => {
                if ([401].includes(err.status) && refreshToken) {

                    this.authService.getNewToken({refreshToken}).pipe(switchMap((data: JWTResponse) =>{
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