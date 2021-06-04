import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  course: Course;

  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }


   ngOnInit() :void {
     
   }
  // {
  //   this.course = this.courseService.retrieveById(+this.activatedRoute.snapshot.paramMap.get('id'));
  // }

  // save():void
  // {
  //   this.courseService.save(this.course);
  // }

}
