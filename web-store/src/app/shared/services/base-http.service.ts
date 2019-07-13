import { DependencyInjector } from '../dependency-injector';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BaseModel } from '../models/base.model';
import { PaginatedResponse } from '../models/paginated-response.model';


export abstract class BaseHttpService<T extends BaseModel> {

  protected httpClient: HttpClient;
  protected serverUrl: string;
  public updateList = new Subject();

  protected constructor() {
    this.httpClient = DependencyInjector.inject(HttpClient);
    this.serverUrl = environment.API.BASE_URL;
  }

  public getListAgain(confirm) {
    this.updateList.next(confirm);
  }

  public getServerUrl(): string {
    return this.serverUrl;
  }

  public setServerUrl(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  public getListAll() {
    return this.httpClient.get<T[]>(this.serverUrl);
  }

  public getList(filters?: {}) {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(function (key) {
        if (filters[key] !== null && filters[key] !== undefined) {
          params = params.append(key, filters[key]);
        }
      });
    }
    return this.httpClient.get<PaginatedResponse<T>>(this.serverUrl, {params});
  }

  public getDetail(id: number) {
    return this.httpClient.get<T>(`${this.serverUrl}${id}/`);
  }

  public create(object: T) {
    delete object.id;
    return this.httpClient.post<T>(this.serverUrl, object);
  }

  public update(object: T) {
    const url = `${this.serverUrl}${object.id}/`;
    return this.httpClient.put<T>(url, object);
  }

  public delete(id: string) {
    const url = `${this.serverUrl}${id}/`;
    return this.httpClient.delete(url);
  }

}
