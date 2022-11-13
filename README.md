Steps to run this project and database via docker compose:

1. Install docker
2. Create .env file at root of the project
3. Add following variables there

PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=nodejsapp

4. Run docker-compose up from root folder


Steps to run this project locally and database via docker compose:

1. Install docker
2. Create .env file at root of the project
3. Add following variables there

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=nodejsapp

4. Run docker-compose up db from root folder