# Layout Boilerplate

Basic structure created to speed projects styling development.

## Basic structure

```
src
├── /assets                     # project resources
|   ├── /favicons
|   ├── /images
|   ├── /svg
|   ├── /fonts
|   └── ...
|
├── /css                        # generated output files
|   └── main.css
|
├── /js                         # project scripts
|   ├── /vendor
|   └── ...
|
└── /scss                       # development files
    ├── /abstracts
    ├── /base
    ├── /components
    ├── /layouts
    ├── /pages
    ├── /themes
    ├── /vendor
    └── main.scss               # main file to compile
```

## Prerequisites

Node/NPM installed.

## Usage

Run `npm install` to install project dependencies.

Use `npm run build-scss` to compile SCSS files.

Update `index.html` with appropriate path to CSS/JS files.