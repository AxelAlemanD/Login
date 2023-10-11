import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials.dto';
import { MenuItem } from 'src/app/models/menu-item.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  session: Credentials | undefined;
  isMenuVisible: boolean = false;
  menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Log Out',
      color: 'danger',
      icon: 'log-out-outline'
    }
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.session = this.authService.session;
  }

  switchMenuVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  executeMenuAction(optionClicked: MenuItem | undefined) {
    if (optionClicked && optionClicked.name === 'Log Out') {
      this.authService.logOut();
      this.router.navigate(['/login']);
    } 
    this.switchMenuVisibility();
  }

}
