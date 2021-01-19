# React Module Federation Starter

This project is designed to be a starter for using:

- Webpack 5 (with module federation)
- React
- Typescript

The structure of the project is a monorepo that has a app shell under the shell folder.
This app shell will be used to join all the modules together using the module federation plugin.

## Production
First we run `yarn build` to build a production version of all the various apps to the dist folder. When built, all files go into the `/dist/static` folder. Then we move the `index.html` from the `shell` module to the root of the `dist` folder.

When we build modules on their own, we need to also rebuild the `shell` module to refresh the cache busting string at the end of the remoteEntry links that live inside it e.g. `/static/attendance/remoteEntry.js?v=1610825531449`.

After building all modules to the `dist` folder, we can run `yarn serve` to start up the server. This starts up a custom express server that lives under `build-utils/serve.js`.

This server will serve all the static files from inside `dist/static`. Other then that it will display the html file we moved to root for every other endpoint that doesn't start with `/static`. This is so it works well with React router in regular mode rather then using it as a hash router.

If we are using a hash router, we don't need to show this file for all other requests. This is because the route comes after a hash, so the server treats it as the same endpoint, but the client side router treats it as a different page.

## Todo
- Implement Typescript [like this](https://github.com/module-federation/module-federation-examples/tree/master/typescript)

## Interesting Links
- [Example of setup with Module Federation](https://github.com/module-federation/module-federation-examples/issues/102#issuecomment-695162211)
- [Post on a React setup](https://www.nicolasdelfino.com/blog/micro-frontends-module-federation-webpack#monorepo--yarn-workspaces)
