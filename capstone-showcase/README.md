# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Website Tools Used

- Front-end: TypeScript + React
- Back-end: JavaScript + ExpressJS
- API: REST

# Running the Website Locally

1. Change directories into the desired folder to store the folders from the repo

- Ex. cd Downloads

2. git clone https://github.com/mmrutled/Capstone-Showcase.git
3. In Visual Studio Code, open the new folder created by line 2
4. Npm create vite@latest capstone-showcase

- Choose Ignore files and continue
- Choose React
- Choose TypeScript

5. Change directories into the capstone showcase folder downloaded from the repo

- cd capstone-showcase

6. npm install
7. Troubleshoot if the latest version of the website is not showing. If not, skip to next step

- git fetch --all
- git reset --hard origin/main

8. npm install react-router-dom@latest
9. Run the website

- npm run dev

# Testing Frontend-Backend connection locally:

1. Open terminal in VS Code and navigate to the directory of the project
2. cd capstone-showcase << backend
3. Once in 'backend' directory, run command "node server.js"
4. Open 2nd terminal on VS Code and navigate to the directory of the project
5. cd capstone-showcase
6. Once in the 'capstone-showcase' directory, run command "npm run dev"
7. Launch web application on browser and navigate to Survey page
8. Enter information as appropriate and click “Submit”
9. Check the ‘backend’ terminal console for submission information
