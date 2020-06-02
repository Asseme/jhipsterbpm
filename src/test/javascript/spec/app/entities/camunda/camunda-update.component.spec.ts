import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterBpmTestModule } from '../../../test.module';
import { CamundaUpdateComponent } from 'app/entities/camunda/camunda-update.component';
import { CamundaService } from 'app/entities/camunda/camunda.service';
import { Camunda } from 'app/shared/model/camunda.model';

describe('Component Tests', () => {
  describe('Camunda Management Update Component', () => {
    let comp: CamundaUpdateComponent;
    let fixture: ComponentFixture<CamundaUpdateComponent>;
    let service: CamundaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBpmTestModule],
        declarations: [CamundaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CamundaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CamundaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CamundaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Camunda(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Camunda();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
