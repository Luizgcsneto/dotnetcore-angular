import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url =  'https://localhost:5001/api/cars';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Car[]>
  {
    return this.http.get<Car[]>(this.url);
  }

  getById(Id: number): Observable<Car>
  {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Car>(apiUrl);
  }

  saveCar(car: Car): Observable<any>
  {
    return this.http.post<Car>(this.url, car, this.httpOptions);
  }

  updateCar(car: Car): Observable<any> {
    return this.http.put<Car>(this.url, car, this.httpOptions);
  }

  deleteCar(Id: number): Observable<any>{
     const apiUrl = `${this.url}/${Id}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }

}
