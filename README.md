## Table of Contents

- [General Setup](#general-setup)
- [Backend Setup](#backend-setup)
  - [Create server and client folder](#create-server-and-client-folder)
  - [Run npm init](#run-npm-init)
  - [Edit package.json](#edit-package.json)
  - [Create index.js inside the server folder](#create-index.js-inside-the-server-folder)
  - [Create db folder inside server](#create-db-folder-inside-server)
  - [Create dummy data inside the db folder](#create-dummy-data-inside-the-db-folder)
- [Frontend Setup](#frontend-setup)
## General Setup
#### The usual
1. Create repo in Github
2. Clone repo 
3. CD to repo folder
#### Create server and client folder
```sh
mkdir server client
```
#### Run npm init
```sh
npm init -y
```
#### Edit package.json
```json
{
  "name": "react-ucbsf",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "install": "cd client && npm install",
    "heroku-postbuild": "cd client && npm run build",
    "start": "node server"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
#### Create .gitignore file
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# production
build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

package-lock.json
yarn.lock
```
## Backend Setup
#### Create index.js inside the server folder
```javascript
const path = require('path')
const express = require('express')
const data = require('./db/fakedata.json')
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get("/api/all", (req, res) => {
  res.json(data)
})

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
```
#### Create db folder inside server
```
mkdir server/db
```
#### Create dummy data inside the db folder
```json
{
  "items": {
    "item": [
      {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "ppu": 0.55,
        "batters": {
          "batter": [
            {
              "id": "1001",
              "type": "Regular"
            },
            {
              "id": "1002",
              "type": "Chocolate"
            },
            {
              "id": "1003",
              "type": "Blueberry"
            },
            {
              "id": "1004",
              "type": "Devil's Food"
            }
          ]
        },
        "topping": [
          {
            "id": "5001",
            "type": "None"
          },
          {
            "id": "5002",
            "type": "Glazed"
          },
          {
            "id": "5005",
            "type": "Sugar"
          },
          {
            "id": "5007",
            "type": "Powdered Sugar"
          },
          {
            "id": "5006",
            "type": "Chocolate with Sprinkles"
          },
          {
            "id": "5003",
            "type": "Chocolate"
          },
          {
            "id": "5004",
            "type": "Maple"
          }
        ]
      },
    ]
  }
}
```
## Frontend Setup
#### CD into client
```
cd client
```
#### Run create-react-app
```
npx create-react-app .
```
### source:
1. fetch - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
2. create-react-app - https://create-react-app.dev/
3. require json - https://blog.codingblocks.com/2018/reading-json-files-in-nodejs-require-vs-fs-readfile/
4. json sample - https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html