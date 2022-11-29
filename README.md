# NachoMusic [![CodeQL](https://github.com/NachoToast/NachoMusic/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/NachoToast/NachoMusic/actions/workflows/codeql-analysis.yml)[![Node.js CI (App)](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.app.yml/badge.svg)](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.app.yml)[![Node.js CI (Extensions)](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.extensions.yml/badge.svg)](https://github.com/NachoToast/NachoMusic/actions/workflows/node.js.extensions.yml)

A lightweight music streaming application.

<details>

<summary>Why does this exist?</summary>

<br />Desktop Spotify (on Windows) sucks, it has frequent errors and setting up local files is a buggy, unintuitive mess.

###### "Something went wrong", an error somehow fixable by toggling offline mode.

![image](https://community.spotify.com/t5/image/serverpage/image-id/127647iE603CAA8BE04916A/image-size/large?v=v2&px=999)

###### Songs are frequently removed from Spotify :/

![image](https://user-images.githubusercontent.com/32235595/150896756-270f5279-4c7a-42e0-b99f-0e80772f9e82.png)

###### Local files are unclickable in offline mode, but can still be played via shuffling or adding to queue.

![image](https://user-images.githubusercontent.com/32235595/150896799-ce34b1b2-a101-4366-a89d-1f312d64cdeb.png)

###### Helpful error messages ;)

![image](https://user-images.githubusercontent.com/32235595/204657140-5069df9e-d215-4ee8-93c2-701711a0f778.png)

</details>

# Installation Guide

_Not in production-ready stage yet._

# Local Setup

First make sure you have the following dependencies:

-   [Node JS](https://nodejs.org/en/) v16 or higher. Anything below v16 will probably work but has not been tested.

-   [Yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/), you can still use npm if necessary but some scripts will not work.

You can easily install yarn and pnpm using:

```sh
npm i -g yarn pnpm
```

Note that currently NachoMusic will only work if you install it to you main drive (i.e. `C:\` on Windows).

Everything after this can be done in a terminal:

```sh
git clone https://github.com/NachoToast/NachoMusic.git
git update-index --assume-unchanged app/public/index.html

cd NachoMusic
pnpm install

# app setup
cd app
pnpm install

# extension setup
cd ../extensions
yarn install

# starting the app
cd ../
pnpm start
```

For an ideal app development experience, use 1 terminal for the app dev script (`cd app` and `pnpm start`), and 1 terminal for the start script (`pnpm start`). This should make the app automatically reload whenever a source file changes.

You can reload the app manually using `CTRL + R` or `F5` (or their Mac equivalents).

For extension development, reloading the app isn't feasible since extensions rely on a websocket connection to it, so it's recommended to use testing suites.

# Project Structure

`app` is the React app "frontend" the user sees and interacts with.

`extensions` are the "backend" Node processes that run outside the browser environment.

App and extensions communicate via websockets.

# Script Reference

-   Root:

    -   `start` Runs the Neutralino process, watching `http://localhost:3000`.
    -   `restoreIndex` Fixes changes to the app public HTML file made when Neutralino runs.
    -   `update` Updates the Neutralino client script and binaries.
    -   `build:app` Compiles app.
    -   `build:ext` Compiles extensions.
    -   `package` Creates distributables, make sure this is run using `pnpm run package` and not `pnpm package`.

-   App:

    -   `start` Starts the app in development mode, on `http://localhost:3000`.
    -   `build` Compiles app.
    -   `lint` Lints source files.
    -   `typecheck` Typechecks source files.
    -   `check-all` Does linting and typechecking.

-   Extensions:

    -   `start` Enables hot-reloading for extension development.
    -   `build` Compiles extensions.
    -   `lint` Lints source files.
    -   `typecheck` Typechecks source files.
    -   `check-all` Does linting and typechecking.

# FAQ

-   Why are you using a different package manager (yarn) for extensions?

    -   Since pnpm uses symlinks, Neutralino runs into permission issues when packaging extension dependencies.

-   Why is the restore index script in the extensions directory?

    -   Because the linting and Typescript environments there are Node, not browser.

-   Why do you do `git update-index` on install?

    -   In development Neutralino will change the `%PUBLIC_URL%` to the port it is running on. That shouldn't be tracked in git.

    -   You can undo it using `git update-index --no-assume-unchanged app/public/index.html`
