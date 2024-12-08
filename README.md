# Capstone Showcase Website

# Website Tools Used
- Front-end: TypeScript + React + CSS
- Back-end: ExpressJS + MySQL

# Running the Website Locally
1. Change directories into the desired folder to store the folders from the repo
- Ex. cd Downloads

2. git clone https://github.com/Karina528/Capstone-Showcase.git
   
3. In Visual Studio Code, open the new folder created by line 2

4. npm create vite@latest capstone-showcase
- Choose Ignore files and continue
- Choose React
- Choose TypeScript

5. Change directories into the capstone showcase folder downloaded from the repo
- cd capstone-showcase

6. npm install

7. git fetch --all

8. git reset --hard origin/main

9. npm install react-router-dom@latest

10. Run the website
- npm run dev

# Testing Frontend-Backend connection locally:

1. Open terminal in VS Code and navigate to the directory of the project
2. cd capstone-showcase
3. cd backend
4. Once in 'backend' directory, run command "node server.js"
5. Open 2nd terminal on VS Code and navigate to the directory of the project
6. cd capstone-showcase
7. Once in the 'capstone-showcase' directory, run command "npm run dev"
8. Launch web application on browser and navigate to Survey page
9. Enter information as appropriate and click “Submit”
10. Check the ‘backend’ terminal console for submission information
