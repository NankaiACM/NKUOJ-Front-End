# NKUOJ Front End

![Screenshot of the Login Page](assets/readme-resources/login.png?raw=true "Login Page")
![Screenshot of the Home Page](assets/readme-resources/home.png?raw=true "Home Page")

NKUOJ Front End is a website designed for the Online Judge System of Nankai University (NKUOJ) with vue.js.

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

## Project setup and deployment
Install node.js packages:
```
npm install
```
Compiles and hot-reloads for development:
```
npm run serve
```
Compiles and minifies for production:
```
npm run build
```

## Compatible Back End

[ArcOJ-BackEnd](https://github.com/ArcanusNEO/ArcOJ-BackEnd)