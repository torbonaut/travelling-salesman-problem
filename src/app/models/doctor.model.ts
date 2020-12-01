export interface Doctor {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  lat: number;
  long: number;
  isWaypoint: boolean;
  position?: number;
}
