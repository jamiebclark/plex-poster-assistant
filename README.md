![Plex Poster Assistant Logo](./public/icons/favicon-128.png)

# Plex Poster Assistant
Plex Poster Assistant makes updating Plex poster art seamless from browser. It's designed to be deployed as a Chrome Extension, although it can also be run locally.

## Installation
This can be run locally can be installed using NPM or Yarn
```
yarn
```
### Local Development
The script can be run locally
```
yarn start
```
You can view the output in your browser by navigating to `localhost:3000`

### Building
Building and packaging the project for use in the Chrome Store
```
yarn build
```
This will generate the production build of the project in the `/build/` directory. It will also build an archive ZIP file in `/archives/`

#### Testing
1. [Follow instructions for installing a Chrome extension locally](https://medium.com/@aabroo.jalil/how-to-test-a-chrome-extension-locally-step-by-step-guide-852e4622d4c7)
2. Use the `/build` folder when loading in Chrome


## Usage
Clicking the Chrome Extension button will display a window that will allow a user to enter an image URL. The user can then search through their Plex library to find the corresponding item, and then set the poster art.
![Plex Poster Assistant screenshot](./screenshots//screen01.png)

### Necessary Data
#### Local Plex URL
You'll need to provide the local URL of your Plex server. This will include the protocol and the ports. Something like `http://192.168.0.1:32400`
#### Plex Token
You'll also need the Plex Token. Plex explains how you can retreive that [here](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/)