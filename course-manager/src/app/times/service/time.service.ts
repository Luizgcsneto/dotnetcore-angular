import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Time } from '../model/Time';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  url =  'https://localhost:5001/api/times';

  // retrieveAll(): Time[]
  // {
  //   return Times;
  // }

  // retrieveById(id: number): Time
  // {
  //   return Times.find((timeInterator: Time) => timeInterator.id === id);

  // }

   constructor(private http: HttpClient) { }

  // save(time: Time) :void
  // {
  //   if(time.id)
  //   {
  //     const index = Times.findIndex((timeInterator: Time) => timeInterator.id === time.id);
  //     Times[index] = time;
  //   }
  // }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Time[]>
  {
    return this.http.get<Time[]>(this.url);
  }

  getById(Id: number): Observable<Time>
  {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Time>(apiUrl);
  }

  saveTime(time: Time): Observable<any>
  {
    return this.http.post<Time>(this.url, time, this.httpOptions);
  }

  updateTime(time: Time): Observable<any> {
    return this.http.put<Time>(this.url, time, this.httpOptions);
  }

  deleteTime(Id: number): Observable<any>{
     const apiUrl = `${this.url}/${Id}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }

}



