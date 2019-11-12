# MovieApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server
Open terminal window in root directory
Run `npm i` to install dependencies
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## CORS fix

Express server with angular proxy config is used to handle CORS.

Open another terminal window
Move to server directory: `cd server` in another command line
run `npm i` to install dependencies
run `npm run start` to start express proxy server to fix cors

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
