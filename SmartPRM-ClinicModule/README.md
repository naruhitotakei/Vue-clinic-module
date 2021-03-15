# SmartPRM-ClinicModule
Development of the patient relationship management system for a dental clinic

## ENV variables
| Name              |       Description       |     Default value     |
|-------------------|:-----------------------:|----------------------:|
| VUE_APP_BASE_URL  | APP          URL        | -                     |

## Local run
Firstly install all necessary packages

```
npm install
```

### Hot-reloads development server
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker run
You can run application in the Docker container using included `docker-compose.yml` file.
```
docker-compose up --build     # Starts new application instance in the containers
docker-compose up -d --build  # Starts new application instance in the detached mode
docker-compose down           # Will stop and delete containers
```