import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  jwt_decose;
  postLogin(login): Observable<any> {
    return this.http.post<any>('https://localhost:7268/api/Auth', login);
  }
}
