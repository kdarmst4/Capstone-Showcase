# Capstone Showcase Website

# Website Tools Used
- Front-end: TypeScript + React
- Back-end: JavaScript + ExpressJS + MySQL
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
