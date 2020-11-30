import {OpenRouteJob} from '../models/open-route.model';

export class OpenRouteDto {
  public static toJob(id: number, description: string, lat: number, long: number): OpenRouteJob {
    return { id, description, location: [lat, long] };
  }
}
