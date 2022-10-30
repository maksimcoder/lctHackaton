# Personal project template
This project is maintained by Maksim Deviatilov.

## Run Locally
Below are the instructions on how to setup the template correctly:

**Use the template**

```bash
  npx create-react-app [app-name] --template ts-redux-boiler
```

**Go to the project directory**

```bash
  cd [app-name]
```

**All dependeincies will be installed but you have to setup _husky_**

```bash
  npx husky-init
```

**After husky init you need to change script in husky folder**

Copy this to the `pre-commit` file

```bash
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npx lint-staged

```

**Change this readme with yours**

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
├─ hooks - Contains all hooks (redux, utils, etc.)
├─ pages - Main directory which contains all pages
├─ redux - example directory (may be deleted)
├─ router - Contains RR router and main routes
│  └─ routes - main routes
│  └─ router.ts - React-Router controller of routes
├─ store - Redux store
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

## Legal

MIT License

Copyright (c) [22.10.2022] [Deviatilov Maksim Evgenievich]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
