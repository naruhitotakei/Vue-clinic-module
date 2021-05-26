# Instructions for developers working on the SmartPRM

In this file you can find all the related information and instructions for optimal development process of the application.

## Cloning SmartPRM-ClinicModule

Please make your as you are cloning the project to your local disc, to do so from the main branch, as this is the branch on which the app is being developed.

## Local Run of SmartPRM-ClinicModule

### Start the api in command prompt
```
cd api
npm install
npm run dev
```

### Start the FE in command prompt
```
cd SmartPRM-ClinicModule
npm install
npm run serve
```

### Database credentials 

To configure database credentials using ENV variables (recomended) follow next step. Copy example file api/.env.example to new file called api/.env and change database setting in the api/.env file with the following values:

| Name                  |       Description       | Value									  |
|-----------------------|:-----------------------:|-------------------------------------------|
| POSTGRES_HOST         | Database IP or hostname | '136.243.204.82'						  |
| POSTGRES_USER         |      Database user      |  emazing							      |
| POSTGRES_DB           |      Database name      |  emazing							      |
| POSTGRES_PASSWORD     |    Database password    | 'XkRCDHZ6RpkqRTBe'					      |
| POSTGRES_PORT         |      Database port      |  27032									  |
| AWS_ACCESS_KEY_ID     |    AWS S3 Access Key    |  AKIAVZFMD5UJZZ6QM322					  |
| AWS_SECRET_ACCESS_KEY |     AWS S3 Secret Key   |  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 |
| AWS_BUCKET_NAME       |   AWS S3 bucket name    |  smartprmstorage-dev					  |

this file is gitignored and never comes to the repository.

Application URL: [localhost:8080](http://localhost:8080/) | REST API: [localhost:8080/api/](http://localhost:8080/api/)

### Docker run

You can run application in the Docker container using included `docker-compose.yml` file.
```
docker-compose up --build     # Starts new application instance in the containers
docker-compose up -d --build  # Starts new application instance in the detached mode
docker-compose down           # Will stop and delete containers
```

## Development process

To ensure a smooth development process, please follow these instructions:

- Make sure that you pull the latest version, before you start a new task in order to avoid potential merge conflicts that could break the application functionality later on
- commit your progress regularly; do so as soon as you are finished with a task (or a portion of it, if the task is a bigger one)
- once you have implemented a feature, add the description of the feature and its functionality in the Wiki (this) folder