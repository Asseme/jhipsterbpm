import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICamunda } from 'app/shared/model/camunda.model';
import { CamundaService } from './camunda.service';

@Component({
  templateUrl: './camunda-delete-dialog.component.html',
})
export class CamundaDeleteDialogComponent {
  camunda?: ICamunda;

  constructor(protected camundaService: CamundaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.camundaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('camundaListModification');
      this.activeModal.close();
    });
  }
}
