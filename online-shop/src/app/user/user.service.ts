import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct, IUser } from '../shared/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser | null;

  boughtProducts: IProduct[];

  debtPrice = 0;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUserProfile(): Observable<IUser> {
    return this.http.get(`/users/profile`).pipe(
      tap(((user: IUser) => {
        this.currentUser = user;
        this.boughtProducts = user.bought;
        this.debtPrice = 0;
        user.bought.forEach(product => {
          this.debtPrice += product.price;
        });
      })),
      catchError(() => { this.currentUser = null; return of(null); })
    );
  }

  login(data: { email: string, password: string }): Observable<IUser> {
    return this.http.post(`/users/login`, data).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }

  logout(): Observable<IUser> {
    return this.http.post(`/users/logout`, {}).pipe(
      tap((user: IUser) => this.currentUser = null)
    );
  }

  register(data: { email: string, address: string, username: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(`/users/register`, data).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }

  editProfile(data: { email: string, username: string, address: string }): Observable<IUser> {
    return this.http.put<IUser>(`/users/profile`, data).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }
}
