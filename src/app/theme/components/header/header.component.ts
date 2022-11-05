import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuCollapse') menuCollapse: ElementRef;
  @ViewChild('btnDropped') btnDropped: ElementRef;
  isCollabpsed: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if ('userToken' in localStorage) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;

    }
  }
  logOut() {
    this.authService.logOut();
  }


  openMenu() {
    this.isCollabpsed = !this.isCollabpsed;

  }
}
