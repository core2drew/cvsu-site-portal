const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/site.js', 'public/js')
   .react('resources/js/login.js', 'public/js')
   .react('resources/js/portal.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/site.scss', 'public/css')
   .sass('resources/sass/login.scss', 'public/css')
   .sass('resources/sass/portal.scss', 'public/css')
  
