import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICamunda } from 'app/shared/model/camunda.model';

type EntityResponseType = HttpResponse<ICamunda>;
type EntityArrayResponseType = HttpResponse<ICamunda[]>;

@Injectable({ providedIn: 'root' })
export class CamundaService {
  public resourceUrl = SERVER_API_URL + 'api/camundas';

  constructor(protected http: HttpClient) {}

  create(camunda: ICamunda): Observable<EntityResponseType> {
    return this.http.post<ICamunda>(this.resourceUrl, camunda, { observe: 'response' });
  }

  update(camunda: ICamunda): Observable<EntityResponseType> {
    return this.http.put<ICamunda>(this.resourceUrl, camunda, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICamunda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICamunda[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  camundaRes(): any {
    return this.http.get('http://localhost:8080/engine-rest/deployment/');
  }
}
