# TravellingSalesmanProblem

I wanted to dig into the [Travelling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem#Computing_a_solution) for a friend who is in bicyle delivery and by the way, it was a good chance to use PrimeNG, Leaflet and the Open Route Service API for the first time.

You can select Waypoints from a list of doctors in Klagenfurt am Wörthersee and given your current location it calculates the shortest route to pass all waypoints.

This Project uses
- [Angular 10](https://angular.io/)
- [PrimeNG](https://primefaces.org/primeng/showcase/#/) UI Library
- [NGXS Store](https://www.ngxs.io/) with Storage and DevTools Plugin
- [Leaflet](https://leafletjs.com/) + [ngxLeaflet](https://github.com/Asymmetrik/ngx-leaflet) map display + angular wrapper
- [Open Route Service API](https://openrouteservice.org/) get GeoCoordinates from Address

## Setup

1. Clone the git repository and install all npm dependencies.

    git clone https://github.com/torbonaut/travelling-salesman-problem
    cd travelling-salesman-problem
    npm install

2. edit `environment.ts` and `environment.prod.ts` and insert your personal Open Route Service and Open Cycle Map API key. 

3. Start Dev Server or build the app in production mode

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
