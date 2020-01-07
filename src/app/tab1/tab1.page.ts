import { Component } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Banner } from '../service/data-types/common.types';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  homebanners:Banner[];

  constructor(public http:HttpService,) {}

  ionViewWillEnter(){
    this.banners();
  }

  banners(){
       this.http.getbanner().subscribe( banners => {
         console.log(banners);
       });
  }

}
