# Capstone Showcase Website

# Website Tools Used
- Front-end: TypeScript + React + CSS
- Back-end: ExpressJS + MySQL

# Running the Website Locally
1. Change directories into the desired folder to store the files from the repo.
- Ex. `cd Downloads`

2. Run the command `git clone https://github.com/Karina528/Capstone-Showcase.git`.
   
3. Change directories into the new folder you've just created by using `cd Capstone-Showcase`.

5. Run the command `npm create vite@latest capstone-showcase` and then select the following options:
- Ignore files and continue
- React
- TypeScript

5. Change directories into the capstone-showcase subfolder by using `cd capstone-showcase`.
- Note: This is the subfolder inside the repo and **NOT** the main folder of the repo.

6. Run the following commands:
   ```
   npm install
   git fetch --all
   git reset --hard origin/main
   npm install react-router-dom@latest
   ```

7. Run the website by using `npm run dev`.
   
8. Open the website in your browser using the Local url.

# Testing Frontend-Backend connection locally:

1. Open terminal in VS Code and navigate to the directory of the project
2. `cd capstone-showcase`
3. `cd backend`
4. Once in 'backend' directory, run command `node server.js`
5. Open 2nd terminal on VS Code and navigate to the directory of the project
6. `cd capstone-showcase`
7. Once in the 'capstone-showcase' directory, run command `npm run dev`
8. Launch web application on browser and navigate to Survey page
9. Enter information as appropriate and click “Submit”
10. Check the ‘backend’ terminal console for submission information
