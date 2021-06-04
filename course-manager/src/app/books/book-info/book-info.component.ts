import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../model/Book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  book: Book;

  // constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) { }

   ngOnInit() {

  //   this.book = this.bookService.retrieveById(+this.activatedRoute.snapshot.paramMap.get('id'));

  // }

  // save():void
  // {
  //   this.bookService.save(this.book);
  // }

}

}
