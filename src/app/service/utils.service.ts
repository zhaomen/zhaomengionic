import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public loadingCtrl: LoadingController,
              public toastController: ToastController) { }

  /**
     * 通用的展示 loading 的组件
     * @protected
     * @param {LoadingController} loadingCtrl 
     * @param {string} message 
     * @returns {Loading} 
     * @memberof BaseUI
     */
    public async showLoading(
      message?: string, time?: number) {
      if (time == undefined || time == null) {
          time = 5000;
      }
      if (message == undefined || message == null) {
          message = "加载中...";
      }
      let loader = await this.loadingCtrl.create({
          message: message,
          backdropDismiss: true,//点击返回按钮自动关闭 loading
          cssClass: "loading",
          duration: time,
          translucent: true,
      });
      return loader.present();
  }

  /**
   * 展示toast的通用组件
   */
  public async showToast(message,postion?,head?,time?) {
    const toast = await this.toastController.create({
      header: head ? head : '',
      message: message,
      position: postion ? postion : 'top',
      duration: time ? time : 2000
    });
    toast.present();
  }
}
