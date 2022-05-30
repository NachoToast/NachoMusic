# NachoMusic

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

Follow these steps to set up a development environment:

1. Make sure you have [Node JS](https://nodejs.org/en/) v16 or higher installed.
2. Clone this repository.
3. Install dependencies using [yarn](https://yarnpkg.com/):

```sh
yarn install
```

You can also use npm if yarn is unavailable, but you won't be able to run the hot-reloading or checking scripts.

4. Build the application and extensions:

```sh
# yarn
yarn build:app
yarn build:extensions

# npm
npm run build:app
npm run build:extensions
```

5. You can now run the app using:

```sh
# yarn
yarn start

# npm
npm run start
```

See [script reference](#script-reference) below for other options like hot-reloading, linting, and typechecking.

## Script Reference

```sh
# yarn
yarn <scriptname>

# npm
npm run <scriptname>
```

-   build:app
    -   Compiles app-related Typescript files into Javascript.
-   build:extensions
    -   Compiles extension Typescript files into Javascript.
-   check-all:app
    -   Calls linting and typechecking scripts on app files.
-   check-all:extensions
    -   Calls linting and typechecking scripts on extension files.
-   dev:app
    -   Compiles app-related Typescript files into Javascript with hot-reloading.
-   dev:extensions
    -   Compiles extension Typescript files into Javascript with hot-reloading.
-   lint:app
    -   Lints app-related files.
-   lint:extensions
    -   Lints extension-related files.
-   start
    -   Runs the app.
-   typecheck:app
    -   Typechecks app-related files.
-   typecheck:extensions
    -   Typechecks extension-related files.

For an ideal development environment, use one terminal for the dev:app or dev:extensions script, and a second terminal for the start script. You can then reload the app using `CTRL + R` or `F5` (or their Mac equivalents).
