import { DependencyInjector } from '../dependency-injector';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


export abstract class BaseHttpService<T extends {}> {

  protected httpClient: HttpClient;
  protected serverUrl: string;
  public updateList = new Subject();

  constructor() {
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

  public getList() {
    return this.httpClient.get<T[]>(this.serverUrl);
  }

  public getDetail(id: number) {
    return this.httpClient.get<T>(`${this.serverUrl}${id}/`);
  }

  public create(object: T) {
    // @ts-ignore
    delete object._id;
    return this.httpClient.post<T>(this.serverUrl, object);
  }

  public update(object: T, id: string) {
    const url = `${this.serverUrl}${id}/`;
    return this.httpClient.put<T>(url, object);
  }

  public delete(id: string) {
    const url = `${this.serverUrl}${id}/`;
    return this.httpClient.delete(url);
  }

}
