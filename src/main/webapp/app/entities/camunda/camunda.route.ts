import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICamunda, Camunda } from 'app/shared/model/camunda.model';
import { CamundaService } from './camunda.service';
import { CamundaComponent } from './camunda.component';
import { CamundaDetailComponent } from './camunda-detail.component';
import { CamundaUpdateComponent } from './camunda-update.component';

@Injectable({ providedIn: 'root' })
export class CamundaResolve implements Resolve<ICamunda> {
  constructor(private service: CamundaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICamunda> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((camunda: HttpResponse<Camunda>) => {
          if (camunda.body) {
            return of(camunda.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Camunda());
  }
}

export const camundaRoute: Routes = [
  {
    path: '',
    component: CamundaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterBpmApp.camunda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CamundaDetailComponent,
    resolve: {
      camunda: CamundaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterBpmApp.camunda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CamundaUpdateComponent,
    resolve: {
      camunda: CamundaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterBpmApp.camunda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CamundaUpdateComponent,
    resolve: {
      camunda: CamundaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterBpmApp.camunda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
