import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICamunda, Camunda } from 'app/shared/model/camunda.model';
import { CamundaService } from './camunda.service';

@Component({
  selector: 'jhi-camunda-update',
  templateUrl: './camunda-update.component.html',
})
export class CamundaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected camundaService: CamundaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ camunda }) => {
      this.updateForm(camunda);
    });
  }

  updateForm(camunda: ICamunda): void {
    this.editForm.patchValue({
      id: camunda.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const camunda = this.createFromForm();
    if (camunda.id !== undefined) {
      this.subscribeToSaveResponse(this.camundaService.update(camunda));
    } else {
      this.subscribeToSaveResponse(this.camundaService.create(camunda));
    }
  }

  private createFromForm(): ICamunda {
    return {
      ...new Camunda(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICamunda>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
