import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterBpmTestModule } from '../../../test.module';
import { CamundaDetailComponent } from 'app/entities/camunda/camunda-detail.component';
import { Camunda } from 'app/shared/model/camunda.model';

describe('Component Tests', () => {
  describe('Camunda Management Detail Component', () => {
    let comp: CamundaDetailComponent;
    let fixture: ComponentFixture<CamundaDetailComponent>;
    const route = ({ data: of({ camunda: new Camunda(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBpmTestModule],
        declarations: [CamundaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CamundaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CamundaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load camunda on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.camunda).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
