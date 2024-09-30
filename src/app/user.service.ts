import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  storeUserCredentials(credentials:{email:string,password:string}){
    localStorage.setItem('userCredentials',JSON.stringify(credentials));
  }


}
