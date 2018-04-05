import { Component, OnInit, NgZone } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px;)`);

  users: Observable<User[]>;

  constructor(
    zone: NgZone,
    private userService: UserService,
    private route: Router) {
    this.mediaMatcher.addListener(
      mdq => zone.run(() => this.mediaMatcher = mdq));
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(data => {
      if (data.length > 0) { this.route.navigate(['/contactmanager', data[0].id]); }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
