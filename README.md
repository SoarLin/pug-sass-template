# Pug + Sass Template

## Environment

- Node v18.18.2
- NPM 9.8.1
- Webpack 5.89

## Getting Started

- Install all packages

```
npm install
```

- Start to Development

```
npm start
```

- Build Static Files

```
npm run build
```

## Folder Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── assets
│   ├── css
│   ├── images
│   ├── js
│   ├── pug
│   └── sass
└── webpack.config.js
```

All files are in the src folder, it includes `assest`, `css`, `images`, `js`, `sass` and `pug` folders.

- **assets** : some static files, e.g. fonts, svg ...etc.
- **images** : you can put your jpg, png or gif files here
- **css** : some external css files
- **js** : entry point `index.js` is here, and you also can put other customize js files
- **sass** : put your sass files here, you can manage this folder structure for your own
- **pug** : pug template files, you can use a different layout for extends

And `webpack.config.js` is webpack 4.x config setting, to handle Pug + Sass into HTML files.

## Replace resource
* favicon.ico : src/assets/favicon.ico
* Website keywords, description
* Title for each page

### Note
The following two packages have version restrictions.

* html-loader: 1.3.2. If than v1.3.2, there is a problem with the compiled default screen style.
* css-loader: 3.6.0. If higher than than v3.6.0, will happen race condition to makes compilation failure.