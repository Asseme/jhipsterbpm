import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterBpmSharedModule } from 'app/shared/shared.module';
import { CamundaComponent } from './camunda.component';
import { CamundaDetailComponent } from './camunda-detail.component';
import { CamundaUpdateComponent } from './camunda-update.component';
import { CamundaDeleteDialogComponent } from './camunda-delete-dialog.component';
import { camundaRoute } from './camunda.route';

@NgModule({
  imports: [JhipsterBpmSharedModule, RouterModule.forChild(camundaRoute)],
  declarations: [CamundaComponent, CamundaDetailComponent, CamundaUpdateComponent, CamundaDeleteDialogComponent],
  entryComponents: [CamundaDeleteDialogComponent],
})
export class JhipsterBpmCamundaModule {}
