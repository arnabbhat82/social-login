import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, AmazonLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  userEmail: string;

  constructor(
    private authService: SocialAuthService,
    private authService1: AuthService,
    private router: Router) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data);
      const expirationTime = new Date(new Date().getTime() + (1000 * 60 * 60));

      // console.log(expirationTime);
      this.authService1._user.next(new User(data.id, data.email, data.idToken, expirationTime));
      this.authService1.userIsAuthenticated.subscribe(res => {
        console.log(res);
        this.authService1.autoLogin();
        this.router.navigateByUrl('/inner');
      });
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data);
      const expirationTime = new Date(new Date().getTime() + (1000 * 60 * 60));

      // console.log(expirationTime);
      this.authService1._user.next(new User(data.id, data.email, data.idToken, expirationTime));
      this.authService1.userIsAuthenticated.subscribe(res => {
        console.log(res);
        this.authService1.autoLogin();
        this.router.navigateByUrl('/inner');
      });
    });
  }
  signInWithAmazon(): void {
    this.authService.signIn(AmazonLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut().then((data) => {
      console.log(data);
    });
  }

}
