To install run:

1. install playwright
npm install

2. Project is small implemetation of POM for page specific features,
and some generic playwright page actions and assertions for more common tasks. 
In real project we can stick to one or the other implementation. 

3. Layout of the project structure below.
In pages he have page specific methods:
a. pages/HomePage for home page specific methods.
b. pages/RegistrationPage for registration page pecific methods.

c. pages/PomManager manages pages for easy import. 
d. utils/CommonActions has some generic playwright methods.
e. tests-data/1.png file to upload as new avatar
f. tests-data/speakers.js test-data file to verify speakers on homepage

Project Structure
project-name-root-dir/
├── pages/
│   ├── HomePage.js
│   ├── PomManager.js
│   └── RegistrationPage.js
├── tests/
│   └── test.spec.js
├── utils/
│   └── CommonActions.js
├── tests-data/
│   └── 1.png
│   └── speakers.js
└── package.json

4. Playwright.config has use setting for execution set to headless:true, set to false and uncomment
// await this.page.pause() in CommonActions to run step by step.

5. Command to start tests:
npx playwright test
