import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.page.html',
  styleUrls: ['./inner.page.scss'],
})
export class InnerPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService._user.subscribe(data => {
      console.log(data);
    });
  }

}
