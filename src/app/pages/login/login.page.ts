import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { UtilsService } from 'src/app/service/utils.service';
import { ModalController, NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { error } from 'protractor';

declare var RSAKey: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username;
  password;
  isRemember = false;
  isShow;
  constructor(public httpServer:HttpService,
              public utils:UtilsService,
              public modalCtrl: ModalController,
              public navctrl:NavController,
              public storage:LocalStorageService,
              ) { }

  ngOnInit() {

  }

  async login(){
    console.log(this.username,this.password)
      await this.httpServer.post('login/cellphone?phone='+this.username+"&password="+this.password,null).subscribe((res: any) => {
        console.log(res.loginType);
        if(res.loginType == 1){
          this.storage.setItem("phone",this.username);
          this.storage.setItem("username",res.profile.nickname);
          this.storage.setItem("password",this.password);
          this.navctrl.navigateRoot("/app");
        }
      },error => {
        if(error.status == "400"){
          this.utils.showToast("用户或密码错误！请检查后重新登录","top")
        }
      })
  }

  

}
