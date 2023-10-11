import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/credentials.dto';
import { Response } from 'src/app/models/response.dto';
import { ConnectionStatus, Network } from '@capacitor/network';

const USER_TABLE: string = 'users';
const SESSION_TABLE: string = 'session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session: Credentials | undefined;

  constructor() {
    const storedSession = this._getSession();
    if (storedSession) {
      this.session = storedSession;
    };
  }

  login(credentials: Credentials, remember: boolean = false): Observable<Response> {
    return new Observable((observer) => {
      setTimeout(async () => {
        const { exists, user } = this._isRegisteredUser(credentials);
        const { connected } = await this._getCurrentNetworkStatus();

        if (!connected) {
          observer.error("Slow internet connection, please verify that you are connected");
          return;
        }
        if (!exists) {
          observer.error("This email is not registered, please try to sign up");
          return;
        }
        if (user?.password !== credentials.password) {
          observer.error("Check your credentials and make sure they're spelled correctly");
          return;
        }

        this.session = credentials;
        if (remember) {
          localStorage.setItem(SESSION_TABLE, JSON.stringify(credentials));
        }
        observer.next({
          status: 'success',
          message: `Now you interact as ${credentials.email}`,
          data: credentials
        });
        observer.complete();
      }, 3500);
    });
  }

  signUp(credentials: Credentials): Observable<Response> {
    return new Observable((observer) => {
      setTimeout(async () => {
        const { exists, user } = this._isRegisteredUser(credentials);
        const { connected } = await this._getCurrentNetworkStatus();

        if (!connected) {
          observer.error("Slow internet connection, please verify that you are connected");
          return;
        }
        if (exists) {
          observer.error("This email already exists, please try to sign in");
          return;
        }

        const users = this._getStoredUsers();
        users.push(credentials);
        localStorage.setItem(USER_TABLE, JSON.stringify(users));
        this.session = credentials;

        observer.next({
          status: 'success',
          message: 'Successfully registered user',
          data: credentials
        });
        observer.complete();
      }, 3500);
    });
  }

  logOut() {
    this.session = undefined;
    localStorage.removeItem(SESSION_TABLE);
  }

  resetPassword(credentials: Credentials): Observable<Response> {
    return new Observable((observer) => {
      setTimeout(async () => {
        const { exists } = this._isRegisteredUser(credentials);
        const { connected } = await this._getCurrentNetworkStatus();

        if (!connected) {
          observer.error("Slow internet connection, please verify that you are connected");
          return;
        }
        if (!exists) {
          observer.error("This email is not registered, please check your credentials");
          return;
        }

        const users = this._getStoredUsers();
        const userIndex = users.findIndex(storedUser => storedUser.email === credentials.email);
        users[userIndex] = credentials;
        localStorage.setItem(USER_TABLE, JSON.stringify(users));

        this.session = credentials;

        observer.next({
          status: 'success',
          message: 'Your password has been reset, you will be redirected in a moment',
          data: credentials
        });
        observer.complete();
      }, 3500);
    });
  }

  isAuthenticated(): boolean {
    return this.session !== undefined;
  }

  private _getStoredUsers(): Credentials[] {
    let usersString = localStorage.getItem(USER_TABLE);
    const users = (usersString) ? JSON.parse(usersString) : [];
    return users;
  }

  private _getSession(): Credentials | undefined {
    let sessionString = localStorage.getItem(SESSION_TABLE);
    if (sessionString) {
      return JSON.parse(sessionString);
    }
    return;
  }

  private _isRegisteredUser(credentials: Credentials): { exists: boolean, user: Credentials | undefined } {
    const users = this._getStoredUsers();
    const user = users.find(user => user.email === credentials.email)
    return { exists: user != undefined, user }
  }

  private async _getCurrentNetworkStatus(): Promise<ConnectionStatus> {
    return await Network.getStatus();
  };

}
