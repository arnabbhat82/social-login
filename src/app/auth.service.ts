import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

export interface AuthResponseData {
  id: string;
  name: string;
  photoUr: string;
  firstName: string;
  idToken: string;
  lastName: string;
  provider: string;
  expirationTime: Date;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  // tslint:disable-next-line: variable-name
  private _userId = null;
  // tslint:disable-next-line: variable-name
  public _user = new BehaviorSubject<User>(null);
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;  // this will convert it to a booloen
      } else {
        return false;
      }
    }));
  }
  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.token;
      } else {
        return null;
      }
    }));
  }
  get uname() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.message;
      } else {
        return null;
      }
    }));
  }
  get token() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.token;
      } else {
        return null;
      }
    }));
  }

  constructor() { }
  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(map(storedData => {
      if (!storedData || !storedData.value) {
        return null;
      }
      const parsedData = JSON.parse(storedData.value) as { token: string; expirationTime: string; userId: string, email: string };
      const expirationTime1 = new Date(parsedData.expirationTime);
      if (expirationTime1 <= new Date()) {
        return null;
      }
      const user = new User(parsedData.userId, parsedData.email, parsedData.token, expirationTime1);
      return user;
    }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }
  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(new Date().getTime() + (1000 * 60 * 60));
    this._user.next(
      new User(
        userData.id,
        userData.provider,
        userData.idToken,
        userData.expirationTime,
      )
    );
    this.storeAuthData(userData.id, userData.idToken, expirationTime.toISOString(), userData.email);
  }

  private storeAuthData(userId: string, token: string, tokenExpiraionDate: string, email: string) {
    const data = JSON.stringify({ userId, token, tokenExpiraionDate, email });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
}
