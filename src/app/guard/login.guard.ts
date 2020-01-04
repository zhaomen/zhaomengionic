import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private modalController: ModalController, ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var userinfo = window.localStorage.getItem('username');
    console.log(userinfo)
    if (!userinfo) {
      this.presentModal();
      return false;
    } else {
      return true;
    }
  }
  //throw new Error("Method not implemented.");


  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage
    });
    return await modal.present();
  }


}
