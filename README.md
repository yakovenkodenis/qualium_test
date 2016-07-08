# Test React app for Qualium Systems interview.

### Setting up and starting the app:

Installing dependencies and validating the webpack config file:
```shell
npm install && cd client && npm run setup
```

Starting the server:
```shell
node server.js
```

Commands for the client-side app are accessible from the `./client` folder.

Starting webpack-dev-server:
```shell
npm run start
```

Running tests suit:
```shell
npm test
```

### Building the app for deploy:

Building the `bundle.js` file without optimizations (development mode):
```shell
npm run build-and-copy-static
```

Building the `bundle.js` file with optimizations (production mode):
```shell
npm run build-and-copy-static:prod
```
The command `build-and-copy-static` will build a `bundle.js` file, copy it to the `static` folder located in root directory and copy the `index.html` file to the root directory.
