import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  
  slideOpts = {
    effect: 'flip',
    speed: 400,
    loop: true,
    autoplay: {
      delay: 2000
    }
  }
  
  constructor() { }

  ngOnInit() {}

}
