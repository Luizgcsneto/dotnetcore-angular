import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url =  'https://localhost:5001/api/books';

  // retrieveAll(): Book[]
  // {
  //   return books;
  // }

  // retrieveById(id: number): Book
  // {
  //   return books.find((bookInterator: Book) => bookInterator.id === id);
  // }

    // save(book: Book) :void
  // {
  //   if(book.id)
  //   {
  //     const index = books.findIndex((bookInterator: Book) => bookInterator.id === book.id);
  //     books[index] = book;
  //   }
  // }

   constructor(private http: HttpClient) { }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Book[]>
  {
    return this.http.get<Book[]>(this.url);
  }

  getById(Id: number): Observable<Book>
  {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Book>(apiUrl);
  }

  saveBook(book: Book): Observable<any>
  {
    return this.http.post<Book>(this.url, book, this.httpOptions);
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put<Book>(this.url, book, this.httpOptions);
  }

  deleteBook(Id: number): Observable<any>{
     const apiUrl = `${this.url}/${Id}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }



}



