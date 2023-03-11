# Front End of NKU-OJ

![Screenshot of the Login Page](assets/readme-resources/login.png?raw=true "Login Page")
![Screenshot of the Home Page](assets/readme-resources/home.png?raw=true "Home Page")
![Screenshot of the Submission Page](assets/readme-resources/submission.png?raw=true "Submission Page")
![Screenshot of the Admin Page](assets/readme-resources/admin.png?raw=true "Admin Page")

NKUOJ Front End is a website designed for the Online Judge System of Nankai University (NKU-OJ) with vue.js v3 and Vite.

## Features

+ Access control with all pages requiring user logged in;
+ An Embedded administrator dashboard (Under development);
+ Allowing users to list and view public problems;
+ Supporting users to subscribe courses, assignments, exams and contests;
+ Pages to view problems, courses, assignments, exams and contests in detail;
+ A profile page to view and edit user info;
+ Rank lists for exam and contest;
+ Multiple tabs and links on home page;
+ Supporting in-site announcements;
+ A page to view submissions with details of every test case and the submitted code;
+ All submissions on this site is visible in status page with a filter supported, if strict mode is disabled;
+ A strict mode user interface blocking every other pages except exam and contest.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Compatible Back End

[ArcOJ-BackEnd](https://github.com/ArcanusNEO/ArcOJ-BackEnd)
