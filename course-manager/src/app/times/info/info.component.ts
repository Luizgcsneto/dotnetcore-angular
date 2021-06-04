import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Time } from '../model/Time';
import { TimeService } from '../service/time.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  time: Time;
  // constructor(private activatedRoute: ActivatedRoute, private timeService: TimeService) { }

   ngOnInit() {

  //   this.time = this.timeService.retrieveById(+this.activatedRoute.snapshot.paramMap.get('id'));

  // }

  // save():void
  // {
  //   this.timeService.save(this.time);
  // }

}

}
