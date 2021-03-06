import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {tap} from 'rxjs/operators';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
  }

  register(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/auth/register', user);
  }

  login(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/auth/login', user)
      .pipe(
        tap((data: UserModel) => {
          localStorage.setItem('token', JSON.stringify(data));
        })
      );
  }
}
