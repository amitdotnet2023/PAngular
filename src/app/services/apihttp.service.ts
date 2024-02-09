import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ApihttpService {

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(url, httpOptions)
  }

  public post(url: string, parameterObject?: any): Observable<any> {
    return this.http.post(url, parameterObject, httpOptions);
  }

  public put(url: string, parameterObject?: any): Observable<any> {
    return this.http.put(url, parameterObject, httpOptions)
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, httpOptions)
  }

}
