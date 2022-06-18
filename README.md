# NachoMusic [![Node.js CI](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.yml/badge.svg)](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.yml)[![CodeQL](https://github.com/NachoToast/NachoMusic/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/NachoToast/NachoMusic/actions/workflows/codeql-analysis.yml)

A simple and lightweight music streaming application.

<details>

<summary>Why does this exist?</summary>

<br />Desktop Spotify (on Windows) sucks, it has frequent errors and setting up local files is a buggy, unintuitive mess.

###### "Something went wrong", an error somehow fixable by toggling offline mode.

![image](https://community.spotify.com/t5/image/serverpage/image-id/127647iE603CAA8BE04916A/image-size/large?v=v2&px=999)

###### Songs are frequently removed from Spotify :/

![image](https://user-images.githubusercontent.com/32235595/150896756-270f5279-4c7a-42e0-b99f-0e80772f9e82.png)

###### Local files are unclickable in offline mode, but can still be played via shuffling or adding to queue.

![image](https://user-images.githubusercontent.com/32235595/150896799-ce34b1b2-a101-4366-a89d-1f312d64cdeb.png)

</details>

# Installation Guide

_Not in production-ready stage yet._

# Local Setup

First make sure you have the following dependencies:

-   [Node JS](https://nodejs.org/en/) v16 or higher. Anything below v16 will probably work but has not been tested.

-   [Yarn](https://yarnpkg.com/), you can still use npm if necessary but some scripts will not work.

Note that currently NachoMusic will only work if you install it to you main drive (i.e. `C:\` on Windows).

Everything after this can be done in a terminal:

```sh
git clone https://github.com/NachoToast/NachoMusic.git
git update-index --assume-unchanged app/public/index.html

cd NachoMusic
yarn install
yarn install:app
yarn install:ext

yarn build:app
yarn build:ext

yarn neu run
```

You may get a `Neutralino is not defined` error on initial startup, simply reload the app using `F5` or `CTRL + R` to fix this.

See [script reference](#script-reference) below for other options like hot-reloading, linting, and typechecking.

## Script Reference

```sh
# yarn
yarn <scriptname>

# npm
npm run <scriptname>
```

```sh
# Compiling and bundling using React scripts (app) and TSC (extensions)
yarn build:app
yarn build:ext

# Linting using Eslint and Prettier
yarn lint:app
yarn lint:ext

# Type checking using TSC
yarn typecheck:app
yarn typecheck:ext

# Compiling with hot-reloading
yarn dev:app
yarn dev:ext

# Updating Neutralinojs binaries and client
yarn update

# Installing dependencies
yarn install:app
yarn install:ext

# Start app process in development mode
yarn start

# Start app process in production mode
yarn neu run

# Testing using Jest
yarn test:app
yarn test:ext

# Packaging app for release
yarn package
```

For an ideal app development environment, use one terminal for the `dev:app` script, and a second terminal for the `start` script. After this the app should reload automatically whenever a source app file changes. You can reload the app manually using `CTRL + R` or `F5` (or their Mac equivalents).

For extension development, reloading the app is not feasible since extensions rely on a websocket connection to the it. Because of this it's recommended to employ testing suites for extensions.
