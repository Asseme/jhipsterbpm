import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterBpmTestModule } from '../../../test.module';
import { CamundaComponent } from 'app/entities/camunda/camunda.component';
import { CamundaService } from 'app/entities/camunda/camunda.service';
import { Camunda } from 'app/shared/model/camunda.model';

describe('Component Tests', () => {
  describe('Camunda Management Component', () => {
    let comp: CamundaComponent;
    let fixture: ComponentFixture<CamundaComponent>;
    let service: CamundaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBpmTestModule],
        declarations: [CamundaComponent],
      })
        .overrideTemplate(CamundaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CamundaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CamundaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Camunda(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.camundas && comp.camundas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
