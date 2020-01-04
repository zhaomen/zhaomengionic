import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appconfig } from '../app.config';
import { Observable } from 'rxjs';
import { map , filter} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  IP: any;
  rodom: any;
  constructor(public http:HttpClient) { 
    this.IP = Appconfig.webapi;
    this.rodom =  '&r=' + Math.random();
  }

  get(api){
    return new Promise((resolve,reject)=>{
        this.http.get(this.IP + api + this.rodom).subscribe((response)=>{
          resolve(response);
        },(err)=>{
          reject(err);          
        })
    })
  }

  post(api,data){
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Cache-Control":'no-cache',
      "Access-Control-Allow-Origin": "*"
    });
    const options = ({
      headers: header,
      withCredentials: true,
    });

    return new Promise((resolve,reject)=>{
      console.log(data)
        this.http.post(this.IP + api + this.rodom, data , options).subscribe((response)=>{
          console.log(response)
          resolve(response);
        },(err)=>{
          reject(err);          
        })
    })
  }

  postreturn(api, data) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Cache-Control":'no-cache',
      "Access-Control-Allow-Origin": "*"
    });
    const options = ({
      headers: header,
      withCredentials: true,
    });

    return new Observable((resolve)=>{
        this.http.post(this.IP + api + this.rodom, data , options).pipe(
          map(val => {
            
          })
        )
    })
  }

}
