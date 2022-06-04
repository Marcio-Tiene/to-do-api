
  # <p align="center">To Do Api </h1>
  </p>

## Description

Api for a multi-user task manager web application.


## Installation

- Create a ```.env``` file and use the ```.env.example``` to fill it as you wish.

- if you have Docker and Docker-compose installed you can run:
    ```bash
    $ yarn db:up    
    ```
- Alternatively you can set  the ```.env DATABEASE_URL``` variable with a postgress db of your choice.  


- Install dependencies
    ```bash
    $ yarn   
    ```
- Apply db schema with migrations
  ```bash
  $ yarn migrations:run 
  ```

## Running the api

- Run:
  ```bash
  # development
  $ yarn start

  # watch mode
  $ yarn start:dev

  # production mode
  $ yarn start:prod
  ```

## Tests

- Run:
  ```bash
  # unit tests
  $ yarn test

  # e2e tests
  $ yarn test:e2e

  # test coverage
  $ yarn test:cov
  ```


## License

[MIT licensed](LICENSE).
