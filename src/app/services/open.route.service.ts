import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class OpenRouteService {
  apiKey: string = environment.openRouteServiceApiKey;
  apiUrl: string = environment.openRouteAPIUrl;

  constructor(private http: HttpClient) {
  }

  public getCoordinatsByAddress(address: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('text', address)
      .set('size', '1')
      .set('api_key', this.apiKey);
    const options = {
      params
    };
    return this.http.get(this.apiUrl + '/geocode/search', options);
  }
}
