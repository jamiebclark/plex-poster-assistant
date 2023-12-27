![Plex Poster Assistant Logo](./public/icons/favicon-128.png)

# Plex Poster Assistant
Plex Poster Assistant makes updating Plex poster art seamless from browser. It's designed to be deployed as a Chrome Extension, although it can also be run locally.

## Installation
This can be run locally can be installed using NPM or Yarn
```
yarn
```
### Local Development
Developer mode can be run locally
```
yarn start
```
You can view the output in your browser by navigating to `localhost:3000`

### Building
Building and packaging the project for use in the Chrome Store
```
yarn build
```
This will generate the production build of the project in the `/build/` directory. It will also build a ZIP file in `/archives/`

#### Testing
1. [Follow instructions for installing a Chrome extension locally](https://medium.com/@aabroo.jalil/how-to-test-a-chrome-extension-locally-step-by-step-guide-852e4622d4c7)
2. Use the `/build` folder when loading in Chrome


## Usage
[How to use the Plex Poster Assistant](https://github.com/jamiebclark/plex-poster-assistant/wiki/How-to-Use-The-Plex-Poster-Assistant)