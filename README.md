# NestJS Starter Project

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [NestJS CLI](https://docs.nestjs.com/cli): Install globally using:
  ```sh
  npm install -g @nestjs/cli
  ```

## Installation
1. Create a new NestJS project:
   ```sh
   nest new project-name
   ```
2. Navigate into the project directory:
   ```sh
   cd project-name
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
   Or using yarn:
   ```sh
   yarn install
   ```

## Running the Application
To start the application in development mode:
```sh
npm run start
```
For watch mode (auto-restart on changes):
```sh
npm run start:dev
```
For production mode:
```sh
npm run build
npm run start:prod
```

## Project Structure
```
project-name/
├── src/
│   ├── app.module.ts      # Root module
│   ├── app.controller.ts  # Controller (handles routes)
│   ├── app.service.ts     # Service (handles business logic)
│   └── main.ts            # Entry point
├── test/                  # Testing files
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Generating Components
Use Nest CLI to generate controllers, services, or modules:
```sh
nest generate controller users
nest generate service users
nest generate module users
```
Or shorthand:
```sh
nest g co users
nest g s users
nest g mo users
```

## Environment Variables
Create a `.env` file and define environment variables:
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
```
Then, install and configure `@nestjs/config`:
```sh
npm install @nestjs/config
```
Use it in `app.module.ts`:
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

## Testing
Run unit tests:
```sh
npm run test
```
Run end-to-end (e2e) tests:
```sh
npm run test:e2e
```
Run with coverage:
```sh
npm run test:cov
```

## Linting and Formatting
Check linting:
```sh
npm run lint
```
Fix linting issues:
```sh
npm run lint --fix
```
Format code:
```sh
npm run format
```

## Building and Deployment
To build the project:
```sh
npm run build
```
For Docker deployment, create a `Dockerfile`:
```Dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
```
Then build and run:
```sh
docker build -t nest-app .
docker run -p 3000:3000 nest-app
```

## License
This project is licensed under the [MIT License](LICENSE).

