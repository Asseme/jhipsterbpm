import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICamunda } from 'app/shared/model/camunda.model';
import { CamundaService } from './camunda.service';
import { CamundaDeleteDialogComponent } from './camunda-delete-dialog.component';

@Component({
  selector: 'jhi-camunda',
  templateUrl: './camunda.component.html',
})
export class CamundaComponent implements OnInit, OnDestroy {
  camundas?: ICamunda[];
  eventSubscriber?: Subscription;
  deployment: any;

  constructor(protected camundaService: CamundaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.camundaService.query().subscribe((res: HttpResponse<ICamunda[]>) => (this.camundas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCamundas();
    this.camundaeployments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICamunda): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCamundas(): void {
    this.eventSubscriber = this.eventManager.subscribe('camundaListModification', () => this.loadAll());
  }

  delete(camunda: ICamunda): void {
    const modalRef = this.modalService.open(CamundaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.camunda = camunda;
  }

  camundaeployments(): void {
    this.camundaService.camundaRes().subscribe((res: any) => {
      this.deployment = res;
    });
  }
}
