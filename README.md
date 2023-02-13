# Happy pig

## How to run backend

#### 1. Install Docker Desktop

a. Open https://www.docker.com/products/docker-desktop/

b. Click on button "Mac with Apple Chip"

c. Install the app

#### 2. Run Docker Desktop

#### 3. Copy file ./dev-tools/docker/docker-compose.yml to any directory

#### 4. Open terminal and go to this directory

#### 5. Run command in terminal:

```bash
cd ./dev-tools/docker
docker-compose up
```

#### 6. Open file ./dev-tools/docker/rest-api/fund.http and ./dev-tools/docker/rest-api/bank.http in WebStorm

#### 7. This files contains BE API that could be run from WebStorm

# Building a Docker image of the project, and push it to DockerHub

#### 1. Run command for building a Docker image (change version of image):

```bash
docker build -t happy-pig-ui:0.0.0.1 .
```

#### 2. Run command for pushing a Docker image to DockerHub (change version of tag):

```bash
docker login docker.io
docker tag happy-pig-ui:latest avagner/react-happy-pig:0.0.0.1
docker push avagner/react-happy-pig:0.0.0.1
```

## Git hooks

Tune git hook to check git message convention (from root directory):

### git config --local core.hooksPath dev-tools/git/hooks/

chmod 755 dev-tools/git/hooks/commit-msg

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project, so you have full control over them. All the of the commands except `eject` will still work, but they will point to the copied scripts, so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
