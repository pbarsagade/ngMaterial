import { Component, OnInit, NgZone } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px;)`);
  constructor(zone: NgZone) {
    this.mediaMatcher.addListener(
      mdq => zone.run(() => this.mediaMatcher = mdq));
  }

  ngOnInit() {
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
