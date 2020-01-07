import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public storage:LocalStorageService,
              public httpSer:HttpService,
              public router:Router) { }

  ngOnInit() {
  }

  async logout() {
      await this.httpSer.post("/logout?",null).subscribe((res:any )=> {
        //console.log(res)
        if(res.code == 200){
          this.storage.removeItem("username");
          this.router.navigate(['/login']);
        }
      },error => {
        console.log(error)
      })
  }

}
