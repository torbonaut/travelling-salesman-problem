import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {OpenRouteJob, OpenRouteOptimizationAPIResult, OpenRouteVehicle} from '../models/open-route.model';
import {catchError, switchMap, tap} from 'rxjs/operators';

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
    return this.http.get(this.apiUrl + '/geocode/search', { params });
  }

  public getOptimizedRoute(
    vehicle: OpenRouteVehicle,
    jobs: OpenRouteJob[]
  ): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('api_key', this.apiKey);
    const data = { jobs, vehicles: [vehicle]};
    return this.http.post(this.apiUrl + '/optimization', data, { params, observe: 'response'});
  }
}
