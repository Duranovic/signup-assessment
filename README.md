# SignUpAssessment
Link to the deployed website 🚀: https://signup-assessment.vercel.app

## Screenshots
<img width="1679" alt="image" src="https://github.com/Duranovic/signup-assessment/assets/32494609/10ffbb2c-c072-4431-921a-8a6fcd5c9ee8">
<img width="1680" alt="image" src="https://github.com/Duranovic/signup-assessment/assets/32494609/9e7c0b79-ad86-47aa-9439-f55cea7c19ef">

<br><br>

## Prerequisite
Install node version: `v18.18.2`. <br> Any version greater than `v16.14.2` should work just fine but our recommendation is to stick with the `v18.8.2`.

## Start the app
To start the development server: <br>
1. open terminal at the root folder `sign-up-assessment` <br>
2. run `npm i` to install dependencies
3. run `npm run start`
4. Open your browser and navigate to http://localhost:4200/


## Generate code
If you happen to use Nx plugins, you can leverage code generators that might come with it.
Run `npx nx list` to get a list of available plugins and whether they have generators. Then run `npx nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Build / Deployment
In the root of the project, <br>
run `npm run build` to build the application. <br> <br>The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Testing
There are two type of tests on the project: Unit tests and e2e tests.

### Unit Testing
For unit testing we are using Jest. To run use `npm run test`.

### E2E Testing
For E2E Testing we are using Playwright. To run use 2. run `npm run test:e2e`.
