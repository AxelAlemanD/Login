import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Credentials } from 'src/app/models/credentials.dto';

const USER_TABLE: string = 'users';
const SESSION_TABLE: string = 'session';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {

    beforeEach(() => {
      const defaultUser = { email: 'test@example.com', password: 'Abc1234' }
      localStorage.setItem(USER_TABLE, JSON.stringify([defaultUser]));
    });

    it('should return success response when login is called with valid credentials', (done: DoneFn) => {
      const validCredentials: Credentials = { email: 'test@example.com', password: 'Abc1234' };
      service.login(validCredentials).subscribe((response) => {
        expect(response.status).toBe('success');
        expect(response.message).toBe(`Now you interact as ${validCredentials.email}`);
        expect(response.data).toEqual(validCredentials);
        done();
      });
    });

    it('should return error response when login is called with invalid credentials', (done: DoneFn) => {
      const invalidCredentials: Credentials = { email: 'test@example.com', password: '1234Abc' };
      service.login(invalidCredentials).subscribe({
        error: (error) => {
          expect(error).toBe("Check your credentials and make sure they're spelled correctly");
          done();
        },
      });
    });

    it('should return error response when login is called with an unregistered email', (done: DoneFn) => {
      const invalidCredentials: Credentials = { email: 'test2@example.com', password: 'Abc1234' };
      service.login(invalidCredentials).subscribe({
        error: (error) => {
          expect(error).toBe("This email is not registered, please try to sign up");
          done();
        },
      });
    });
  });

  describe('signUp', () => {

    beforeEach(() => {
      const defaultUser = { email: 'test@example.com', password: 'Abc1234' }
      localStorage.setItem(USER_TABLE, JSON.stringify([defaultUser]));
    });

    it('should return success response when signup is called with valid credentials', (done: DoneFn) => {
      const newUser: Credentials = { email: 'otherTest@example.com', password: 'Qwerty1234' };
      service.signUp(newUser).subscribe((response) => {
        expect(response.status).toBe('success');
        expect(response.message).toBe('Successfully registered user');
        expect(response.data).toEqual(newUser);
        done();
      });
    });

    it('should return error response when try to singup with an registered email', (done: DoneFn) => {
      const invalidCredentials: Credentials = { email: 'test@example.com', password: 'Qwerty1234' };
      service.signUp(invalidCredentials).subscribe({
        error: (error) => {
          expect(error).toBe("This email already exists, please try to sign in");
          done();
        },
      });
    });
  });

  describe('logOut', () => {
    beforeEach(() => {
      const defaultUser = { email: 'test@example.com', password: 'Abc1234' }
      localStorage.setItem(USER_TABLE, JSON.stringify([defaultUser]));
      service.session = defaultUser;
      localStorage.setItem(SESSION_TABLE, JSON.stringify(defaultUser));
    });

    it('should remove the loaded session', () => {
      service.logOut();

      expect(service.session).toBeUndefined();
      expect(localStorage.getItem(SESSION_TABLE)).toBeNull();
    });
  });

  describe('resetPassword', () => {

    beforeEach(() => {
      const defaultUser = { email: 'test@example.com', password: 'Abc1234' }
      localStorage.setItem(USER_TABLE, JSON.stringify([defaultUser]));
    });

    it('should return success response when resetPassword is called with valid credentials', (done: DoneFn) => {
      const credentialsWithNewPassword: Credentials = { email: 'test@example.com', password: 'Qwerty1234' };
      service.resetPassword(credentialsWithNewPassword).subscribe((response) => {
        expect(response.status).toBe('success');
        expect(response.message).toBe('Your password has been reset, you will be redirected in a moment');
        expect(response.data).toEqual(credentialsWithNewPassword);
        done();
      });
    });

    it('should return error response when resetPassword is called with an unregistered email', (done: DoneFn) => {
      const invalidCredentials: Credentials = { email: 'test2@example.com', password: 'Qwerty1234' };
      service.resetPassword(invalidCredentials).subscribe({
        error: (error) => {
          expect(error).toBe("This email is not registered, please check your credentials");
          done();
        },
      });
    });
  });
});
