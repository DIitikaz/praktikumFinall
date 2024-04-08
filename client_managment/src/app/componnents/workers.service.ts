import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Worker} from '../models/worker.model';
import {FullWorker} from '../models/fullWorker.model';

@Injectable({providedIn: 'root'})
export class WorkerService {
  public workers: Worker[] = [];

  private tokenHeader = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient) {}

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(
      'https://localhost:7268/api/Worker',
      this.tokenHeader,
    );
  }
  delateWorker(id: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7268/api/Worker/${id}`,
      this.tokenHeader,
    );
  }
  getByIdWorker(id: number): Observable<FullWorker> {
    return this.http.get<FullWorker>(
      `https://localhost:7268/api/Worker/${id}`,
      this.tokenHeader,
    );
  }
  postWorker(worker: FullWorker): Observable<any> {
    console.log('post');
    return this.http.post<FullWorker>(
      `https://localhost:7268/api/Worker`,
      worker,
      this.tokenHeader,
    );
  }

  putWorker(id: number, worker: FullWorker): Observable<FullWorker> {
    console.log('https://localhost:7268/api/Worker/' + id);
    return this.http.put<FullWorker>(
      'https://localhost:7268/api/Worker/' + id,
      worker,
      this.tokenHeader,
    );
  }
}
