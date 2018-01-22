import { Component, ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SharedService } from '../shared.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SharedService]
})

@Injectable()
export class HeaderComponent {
  constructor (private sharedservice: SharedService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/logo.svg'));
    iconRegistry.addSvgIcon('title', sanitizer.bypassSecurityTrustResourceUrl('/assets/title2.svg'));
  }

  logout () {
    this.sharedservice.logout();
  }

}
