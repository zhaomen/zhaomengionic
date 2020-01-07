import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private modalController: ModalController,
              private router:Router,
              private storage:LocalStorageService, ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var userinfo = this.storage.getItem("username");
    console.log(userinfo)
    if (!userinfo) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  //throw new Error("Method not implemented.");


}
