import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { StarComponent } from './star/star.component';
import { CourseService } from './courses/service/course.service';
import { TimesComponent } from './times/times/times.component';
import { ReplacePipe } from './pipe/replace.pipe';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './error/error.component';
import { CourseInfoComponent } from './courses/course-info/course-info.component';
import { InfoComponent } from './times/info/info.component';
import { BooksComponent } from './books/books.component';
import { BookInfoComponent } from './books/book-info/book-info.component';
import { TimeService } from './times/service/time.service';
import { BookService } from './books/service/book.service';
import { CarsComponent } from './cars/cars/cars.component';
import { CarService } from './cars/service/car.service';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    StarComponent,
    TimesComponent,
    ReplacePipe,
    NavBarComponent,
    ErrorComponent,
    CourseInfoComponent,
    InfoComponent,
    BooksComponent,
    BookInfoComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'courses', component: CourseListComponent
      },
      {
        path: 'courses/info/:id', component: CourseInfoComponent
      },
      {
        path: 'times', component: TimesComponent
      },
      {
        path: 'times/info/:id', component: InfoComponent
      },
      {
        path: 'books', component: BooksComponent
      },
      {
        path: 'books/info/:id', component: BookInfoComponent
      },
      {
        path: 'cars', component: CarsComponent
      },
      {
        path: '',redirectTo: 'courses', pathMatch: 'full'
      },
      {
        path: '**', component : ErrorComponent
      }
    ])
  ],

    providers: [ HttpClientModule, CourseService, TimeService, BookService, CarService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
