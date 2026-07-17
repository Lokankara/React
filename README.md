# Getting Started with Create React App

deploy https://lokankara.github.io/React/

## Available Scripts

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eslint`

Runs ESLint to check for code quality issues.

### `npm run eslint:fix`

Runs ESLint with the --fix option to automatically fix fixable issues.

### husky

```bash

npx husky init

npm install husky --save-dev

echo "npm run prepublish" > .husky/pre-commit

git config core.hooksPath .husky

chmod +x .husky/pre-commit

```

### eslint

```bash

npm install eslint --save-dev

npx eslint --init

npm i -D eslint-config-prettier eslint-plugin-prettier prettier