# Project Name

## Installation
1. Clone this repository.

1. Install Playwright from the directory where this project located:
    ```sh
    npm install
    ```

## Project Description

The project is a small implementation of POM (Page Object Model) for page-specific features and some generic Playwright page actions and assertions for more common tasks. In a real project, we can stick to one or the other implementation.

## Project Structure

In the `pages` directory, we have page-specific methods:
- `pages/HomePage.js` for home page-specific methods.
- `pages/RegistrationPage.js` for registration page-specific methods.
- `pages/PomManager.js` manages pages for easy import.
- `utils/CommonActions.js` has some generic Playwright methods.
- `tests-data/1.png` is a file to upload as a new avatar.
- `tests-data/speakers.js` is a test-data file to verify speakers on the homepage.

### Directory Structure

project-name-root-dir/

├── pages/

│ ├── HomePage.js

│ ├── PomManager.js

│ └── RegistrationPage.js

├── tests/

│ └── demo-tests.spec.js

├── utils/

│ └── CommonActions.js

├── tests-data/

│ └── 1.png

│ └── speakers.js

└── package.json

## Playwright Configuration

The `playwright.config.js` file is configured to run tests in headless mode (`headless: true`). To execute tests with the browser visible, set `headless` to `false`. Additionally, to debug tests step-by-step, uncomment the line `// await this.page.pause()` in `CommonActions.js`.

## Command to Start Tests

```sh
npx playwright test --headed
