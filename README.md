# SmartPRM-ClinicModule
Development of the patient relationship management system for a dental clinic

## API ENV Variables

| Name              |       Description       | Default value |
|-------------------|:-----------------------:|--------------:|
| POSTGRES_HOST     | Database IP or hostname |             - |
| POSTGRES_USER     |      Database user      |             - |
| POSTGRES_DB       |      Database name      |             - |
| POSTGRES_PASSWORD |    Database password    |             - |
| POSTGRES_PORT     |      Database port      |          5432 |

## Frontend ENV variables
| Name              |       Description       |     Default value     |
|-------------------|:-----------------------:|----------------------:|
| API_URL           | API endpoint URL        | http://localhost:3080 |

## Local run
> You need to set Postgres database credentials by ENV variables or in the file `api/dao/daoEnquiries.js`

To configure database credentials using ENV variables (*recomended*) follow next step.
Copy example file `api/.env.example` to new file called `api/.env` and cahnge database setting in the `api/.env` file, this file is gitignored and never comes to the repository.

### Start the api
```
cd api
npm install
npm run dev
```

### Start the FE
```
cd frontend
npm install
npm run serve
```

Application URL: [localhost:8080](http://localhost:8080/) | REST API: [localhost:8080/api/](http://localhost:8080/api/) & [localhost:8080/api/enquiries](http://localhost:8080/api/enquiries)

---

## Docker run
You can run application in the Docker container using included `docker-compose.yml` file.
```
docker-compose up --build     # Starts new application instance in the containers
docker-compose up -d --build  # Starts new application instance in the detached mode
docker-compose down           # Will stop and delete containers
```