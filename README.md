# Layout Boilerplate

Basic structure created to speed projects styling development.

And some tips to follow.  

## Favicon

Use [Favicon generator](https://realfavicongenerator.net/) or similar service to generate icons for devices.

**iOS devices request apple-touch icons in root directory creating unnecessary 404 responses.**

## Fonts

Create `@font-face` rules according to project browser support.

Optimal rule is:

```
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2'),     /* Modern Browsers */
       url('myfont.woff') format('woff'),       /* Older Browsers Support */
       url('myfont.ttf') format('truetype');    /* Safari, Android, iOS */
}
```

Order matters!

More about fonts in web [here](https://css-tricks.com/snippets/css/using-font-face/).
