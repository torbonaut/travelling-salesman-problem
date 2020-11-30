/*
  VROOM API Description

  used by OpenRouteProject

  - https://github.com/VROOM-Project/vroom

  - https://github.com/VROOM-Project/vroom/blob/master/docs/API.md

  ________________________________________________________________

  * the expected order for all coordinates arrays is [lon, lat]
  * all timings are in seconds
  * all distances are in meters
  * a time_window object is a pair of timestamps in the form [start, end]
  * cost values in output are the one used in the optimization objective (currently equal to duration)
  * a "task" is either a job, a pickup or a delivery

*/

export interface OpenRouteTimeWindow {
  relativeValue?: number[];
  absoluteValue?: number;
}

export interface OpenRouteJob {
  // an integer used as unique identifier
  id: number;
  // a string describing this job
  description?: string;
  // coordinates array
  location?: number[];
  // index of relevant row and column in custom matrix
  location_index?: any;
  // job service duration (defaults to 0)
  service?: number;
  // an array of integers describing multidimensional quantities for delivery
  delivery?: number[];
  // an array of integers describing multidimensional quantities for pickup
  pickup?: number[];
  // an array of integers defining mandatory skills
  skills?: number[];
  // an integer in the [0, 100] range describing priority level (defaults to 0)
  priority?: number;
  // an array of time_window objects describing valid slots for job service start
  time_windows?: OpenRouteTimeWindow;
}

export interface OpenRouteShipmentStep {
  // an integer used as unique identifier
  id: number;
  // a string describing this job
  description?: string;
  // coordinates array
  location?: number[];
  // index of relevant row and column in custom matrix
  location_index?: any;
  // job service duration (defaults to 0)
  service?: number;
  // an array of time_window objects describing valid slots for job service start
  time_windows?: OpenRouteTimeWindow;
}

export interface OpenRouteShipment {
  // a shipment_step object describing pickup
  pickup: OpenRouteShipmentStep;
  // a shipment_step object describing delivery
  delivery: OpenRouteShipmentStep;
  // an array of integers describing multidimensional quantities
  amount?: number[];
  // an array of integers defining mandatory skills
  skills?: number[];
  // an integer in the [0, 100] range describing priority level (defaults to 0)
  priority?: number;
}

export interface OpenRouteVehicleBreak {
  // an integer used as unique identifier
  id: number;
  // an array of time_window objects describing valid slots for break start
  time_windows: OpenRouteTimeWindow[];
  // break duration (defaults to 0)
  service?: number;
  // a string describing this break
  description?: string;
}

export interface OpenRouteVehicle {
  // an integer used as unique identifier
  id: number;
  // routing profile (defaults to 'car')
  profile?: string;
  // a string describing this vehicle
  description?: string;
  // coordinates array
  start?: number[];
  // index of relevant row and column in custom matrix
  start_index?: any;
  // coordinates array
  end?: number[];
  // index of relevant row and column in custom matrix
  end_index?: any;
  // an array of integers describing multidimensional quantities
  capacity?: number[];
  // an array of integers defining skills
  skills?: number[];
  // a time_window object describing working hours
  time_window?: OpenRouteTimeWindow;
  // an array of break objects
  breaks?: OpenRouteVehicleBreak[];
}

export interface OpenRouteInput {
  // array of job objects describing the places to visit
  jobs: OpenRouteJob[];
  // array of shipment objects describing pickup and delivery tasks
  shipments?: OpenRouteShipment[];
  // array of vehicle objects describing the available vehicles
  vehicles: OpenRouteVehicle[];
  // optional two-dimensional array describing a custom matrix
  matrix?: number[][];
}

export interface OpenRouteOptimizationAPIResult {
  data: any;
}
