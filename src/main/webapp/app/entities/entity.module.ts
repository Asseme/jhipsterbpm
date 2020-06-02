import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'camunda',
        loadChildren: () => import('./camunda/camunda.module').then(m => m.JhipsterBpmCamundaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterBpmEntityModule {}
