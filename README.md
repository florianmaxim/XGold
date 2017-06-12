# The React Junglebook 🙈 🌴

### (The Absolute Most Simple Boilerplates For The React Jungle)

## 🍋 Plate 4: Lemon

This is where all the good shit comes together:

Handle the view (essential).
Write modern (beautiful).
Pack smart (handy).
Serve directly (skillful).
Develop live (smart).
Structure By Routes (fast).
Split Code (faster).
Render On The Server (rapid).

![babel](https://img.shields.io/badge/Transpile-Babel-red.svg)
![react](https://img.shields.io/badge/View-React-green.svg)
![webpack](https://img.shields.io/badge/Pack-Webpack-blue.svg)
![serve](https://img.shields.io/badge/Serve-WebpackDevServer-orange.svg)
![serve](https://img.shields.io/badge/Serve-CustomServer-orange.svg)

```script
git clone https://github.com/cheesyeyes/react-junglebook.git -b 4 . && npm install && npm start
```

![online](https://img.shields.io/badge/Babel-ES6-red.svg)
![online](https://img.shields.io/badge/Webpack-HMR-blue.svg)
![online](https://img.shields.io/badge/Webpack-CHUNKS-blue.svg)
![online](https://img.shields.io/badge/React-ROUTES-green.svg)
![online](https://img.shields.io/badge/React-SSR-green.svg)

## Scripts
The following scripts are served with this plate:

```
"develop:cli": "NODE_ENV=development webpack-dev-server --hot --history-api-fallback --port 8080 --config .webpack.config.js",
"develop:api": "NODE_ENV=development node server.webpack.dev.js",
"develop": "npm run develop:api",

"build": "npm run clean && webpack --config .webpack.config.js --progress -p --env production",
"start": "npm run build && NODE_ENV=production node server.js"
```
