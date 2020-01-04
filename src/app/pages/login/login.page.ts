import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { UtilsService } from 'src/app/service/utils.service';
import { ModalController } from '@ionic/angular';

declare var RSAKey: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username;
  password : String;
  isRemember = false;
  constructor(public httpServer:HttpService,
              public utils:UtilsService,
              public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async login(){
    var encryptStr
      await this.httpServer.post('domcfg.nsf/getRSAkey.xsp?',null).then((res: any) => {
        console.log(res.modulus);
        var rsa = new RSAKey();
        rsa.setPublic(res.modulus, res.publicExponent)
        console.log(this.password)
        encryptStr = rsa.encrypt(this.password);
      })
      this.postlogin(encryptStr)
  }

  async postlogin(password) {
    // &RedirectTo=/domcfg.nsf/getCookie.xsp
    let userUp = "Username=" + this.username + "&Password=" + password + "&docid=&isMobile=true" + (this.isRemember ? "&isRemember=true" : "");
    let apiurl = "domcfg.nsf/wxAuthorize.xsp?";
    await this.httpServer.post(apiurl,userUp).then(
        (res : any) => {
          console.log(res)
         
        }
      ).catch( (error: any) => {
        console.log(error)
      })
      await this.httpServer.post('domcfg.nsf/getCookie.xsp?',null).then((f: any) =>{
        if (f.includes("username") && !f.includes("Anonymous")){
          var name = f.slice(f.indexOf("=") + 1, f.length);
          if (this.isRemember) {
            window.localStorage.setItem("记住密码", this.isRemember.toString());
          }
          window.localStorage.setItem("loginusername", this.username);
          window.localStorage.setItem("username", name);
          window.localStorage.setItem("密码", password);
          this.modalCtrl.dismiss();
        } else {
          this.utils.showToast("用户名或密码错误",'top');
        }
      })
  }

}
