import { Component, OnInit, Input } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router';
import 'rxjs/add/operator/filter';

// default 
const ROUTE_DATA_PARAM: string = 'navTitle';

export class NavTitle {
  label: string;
  url: string;
}

@Component({
  selector: 'nav-title',
  template:
  `<span *ngFor="let t of titles; let last = last;">
    <a routerLink="t.url">{{t.label}}</a><span *ngIf="!last"> {{separator}}</span>
  </span>`,
styles: ['a{text-decoration:none;}']
})
export class NavTitleComponent implements OnInit {
  @Input() separator: string = '–';
  @Input() dataParam: string = ROUTE_DATA_PARAM;

  titles: NavTitle[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        this.titles = this.getNavTitles(this.route.snapshot);
      });
  }

  private getLastChildRoute(activatedSnapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let children = activatedSnapshot.children;
    if (children.length === 0) {
      return activatedSnapshot;
    }
    return this.getLastChildRoute(children[0])
  }

  // checks if the data.navTitle of the route is actually propagated from the parent route
  private isPropagatedData(childRoute: ActivatedRouteSnapshot, parentRoute: ActivatedRouteSnapshot) {
    return parentRoute && parentRoute.data[this.dataParam] === childRoute.data[this.dataParam];
  }

  private getNavTitles(activatedSnapshot: ActivatedRouteSnapshot): NavTitle[] {
    let pathFromRoute = this.getLastChildRoute(activatedSnapshot).pathFromRoot;
    let titles: NavTitle[] = [];

    for (let route of pathFromRoute) {
      if (route.data.hasOwnProperty(this.dataParam) && typeof route.data[this.dataParam] === 'string' && !this.isPropagatedData(route, route.parent)) {
        titles.push({
          label: route.data[this.dataParam],
          url: route.pathFromRoot.filter(r => r.url.length > 0).map(r => r.url[0]).join('/')
        });
      }
    }
    return titles;
  }
}
