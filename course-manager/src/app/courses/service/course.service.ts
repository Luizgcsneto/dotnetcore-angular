  import { Injectable } from '@angular/core';
  import { Course } from '../model/Course';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CourseService
  {

    private url: string = 'https://localhost:5001/api/courses';

    constructor(private http: HttpClient) { }

  // retrieveAll(): Observable<Course[]>
  // {
  //   return this.http.get<Course[]>(this.url);
  // }

  // retrieveById(id: number): Course
  // {
  //   return COURSES.find((courseInterator: Course) => courseInterator.id === id);
  // }

  // save(course: Course): void
  // {
  //   if(course.id)
  //   {
  //     const index = COURSES.findIndex((courseInterator: Course) => courseInterator.id === course.id);
  //     COURSES[index] = course;
  //   }
  // }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Course[]>
  {
    return this.http.get<Course[]>(this.url);
  }

  getById(Id: number): Observable<Course>
  {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Course>(apiUrl);
  }

  saveCourse(course: Course): Observable<any>
  {
    return this.http.post<Course>(this.url, course, this.httpOptions);
  }

  updateCourse(course: Course): Observable<any> {
    return this.http.put<Course>(this.url, course, this.httpOptions);
  }

  deleteCourse(Id: number): Observable<any>{
     const apiUrl = `${this.url}/${Id}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }

  }


