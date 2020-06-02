import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICamunda } from 'app/shared/model/camunda.model';

@Component({
  selector: 'jhi-camunda-detail',
  templateUrl: './camunda-detail.component.html',
})
export class CamundaDetailComponent implements OnInit {
  camunda: ICamunda | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ camunda }) => (this.camunda = camunda));
  }

  previousState(): void {
    window.history.back();
  }
}
