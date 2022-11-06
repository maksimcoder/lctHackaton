# DICOM file viewer


Welcome, this repo is devoted to the DICOM files.

The main logic includes:
- Login
- Library - list of all projects (markup, DICOMs, etc.)
- Editor - DICOM file editor (markup, save and post)
- Generator - generating patologies in DICOM files

**You can access code with these creds:**

- login: andr
- password: 123

## Run Locally
Below are the instructions on how to setup the template correctly:

**Common as anything**

- Clone the repo
```bash
git clone https://github.com/maksimcoder/lctHackaton.git
```

- Install dependencies
```bash
npm install
```

- Run Locally
```bash
npm start
```

**All steps are done, happy hacking!**
## Structure
- Both components and pages lie in separate folders.
- All utility functions (simple calc or one-liners) have to be in special folder `utils`
- In order to use `Components` on several pages, create `<Layout/>` component. See [Layouts](https://nextjs.org/docs/basic-features/layouts)
- Keep all logic in separate `useComponent()` hook. 

**Main file structure**

```
[your-app-name]
├─ .husky - Husky options
│  └─ pre-commit - Commands which run before commit
├─ api - All api relationship (types, service etc.)
├─ assets - Images, styles, fonts
├─ components - Main directory which contains all components
│  └─ utils - All utility components (may be deleted)
├─ editor - Contains DICOM editor (types, class)
├─ pages - Main directory which contains all pages
│  └─ Login - Login page
│  └─ Generator - Page with patologies Generator
│  └─ Library - Page with cards of other researches
├─ router - Contains RR router and main routes
│  └─ routes - main routes
│  └─ router.ts - React-Router controller of routes
├─ theme - Material UI theme files
├─ utils - All utility functions
├─ .eslintrc.json - ESLint settings
├─ .gitignore
├─ prettierignore - files to ignore by Prettier
├─ prettierrc.json - config of Prettier
├─ lint-staged.config.js - Lint-Staged config
├─ tsconfig.json - TypeScript config
```

## Prettier and Pre-commit (lint-staged)

When any developer finished his work, he **commits** files and `lint-staged` package runs commands before making a commit.

Below is script which is located in `lint-stages.config.js`.

It is run ONLY for **STAGED** files. So do not be worried to make commits.
```js
// Check TS files for no errors
	'**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

// Lint and format TS and JS files
'**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
],
```

## Commit naming
As there might be several developers there are several rules of commit naming.

There are 2 main branches - ***Master*** and ***Development***.

During coding, make sub-branches from the **Development** branch beginning with the name of task from **Jira** (like REQ-0001) and short description.

#### Short tips:
- Master branch can only be merged by the **Maintainer** of the project.
- Maintainer of the project must *Approve* MR before merge. 
- MR can be merged by the **Assignee** if there is an approve from **Reviewer**
- Branch naming: _type/developerName/task-number_
- Commit names: Task-number - Description
- Basic branch types: feature, bugfix, hotfix, improve

Below is an example:

![Git flow example](https://miro.medium.com/max/1032/1*VC1_OUUkZawKi3JAcKOQ3g.png)
## Support

For any support, email maintaner of the project.