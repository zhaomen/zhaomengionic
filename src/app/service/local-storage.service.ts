import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(name,item){
    window.localStorage.setItem(name,item)
  }

  getItem(name){
    return window.localStorage.getItem(name);
  }

  removeItem(name){
    return window.localStorage.removeItem(name);
  }
}
