# WPRDC Front End Libraries

## Scopes
### @wprdc-components
Common, lower-level react components used across WPRDC apps.

### @wprdc-connections
Libraries for connecting to WPRDC backend data services. Also provides pre-connected versions of 
several components in @wprdc-components.

### @wprdc-types
TypeScript types for specific WPRDC projects and types that are common across other scopes.

### @wprdc-viz
React components for rendering data visualizations across WPRDC apps.

## Developing/Testing
We use yarn/npm workspaces to handle dependencies 
and [Lerna](https://github.com/lerna/lerna) to handle script running and publishing.

### Clone this repo
```shell
$ git clone git@github.com:WPRDC/frontend-libraries.git wprdc
$ cd wprdc
```
*or if not using SSH:*
```shell
$ git clone https://github.com/WPRDC/frontend-libraries.git wprdc
$ cd wprdc
```

### Install dependencies for all packages
This will install the dependencies for all the packages at the repo root. It will also link all our local packages, 
putting everything we need in the root `node_modules` directory.
```shell
$ yarn install
```

### Build all the packages
This will build all the local packages in `./packages`. Doing so allows the TypeScript compiler as well your IDE or
other code tools to work with our local packages.  
```shell
$ yarn run build:lib
```

### Build or watch whatever app you're working on
The app name must match the name of a package in `./apps` without the scope (often `"@wprdc/"`).
```shell
$ yarn run build:<app_name>
```
*or*
```shell
$ yarn run watch:<app_name>
```

### Watch whatever packages you're working on
Watch scripts are limited in scope to avoid issues.
The [lerna documentation](https://github.com/lerna/lerna/tree/main/commands/run#readme) has details.
```shell
$ yarn run watch:components-am
$ yarn run watch:components-nz
$ yarn run watch:connections
$ yarn run watch:types-am
$ yarn run watch:types-nz
$ yarn run watch:viz
$ yarn run watch:widgets
```

### Use Storybook
```shell
$ yarn run storybook
```
