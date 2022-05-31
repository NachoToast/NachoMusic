# NachoMusic [![Node.js CI](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.yml/badge.svg)](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.yml)

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

Everything after this can be done in a terminal:

```sh
git clone https://github.com/NachoToast/NachoMusic.git
cd NachoMusic
yarn install
yarn install:extensions
yarn build
yarn build:extensions
yarn update
yarn start
```

See [script reference](#script-reference) below for other options like hot-reloading, linting, and typechecking.

## Script Reference

```sh
# yarn
yarn <scriptname>

# npm
npm run <scriptname>
```

```sh
# Compiling and bundling using TSC and webpack
yarn build
yarn build:extensions

# Linting using Eslint and Prettier
yarn lint
yarn lint:extensions

# Type checking using TSC
yarn typecheck
yarn typecheck:extensions

# Compiling with hot-reloading enabled
yarn dev:app

# Installing Neutralino binaries
yarn update

# Installing extension dependencies
yarn install:extensions
```

For an ideal app development environment, use one terminal for the `dev:app` script, and a second terminal for the start script. You can then reload the app using `CTRL + R` or `F5` (Mac equivalents work too).

For extension development, hot-reloading is not feasible since they rely on a websocket connection to the app. Because of this it's recommended to employ testing suites for extensions.
