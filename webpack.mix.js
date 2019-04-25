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

mix.webpackConfig({
   resolve: {
      alias: {
         Components: path.resolve(__dirname, 'resources/js/components/'),
         Reducers: path.resolve(__dirname, 'resources/js/reducers/'),
         Context: path.resolve(__dirname, 'resources/js/contexts/'),
         Utils: path.resolve(__dirname, 'resources/js/utils')
      }
   }
})

mix.react('resources/js/site.js', 'public/js')
   .react('resources/js/login.js', 'public/js')
   .react('resources/js/portal.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/site.scss', 'public/css')
   .sass('resources/sass/login.scss', 'public/css')
   .sass('resources/sass/portal.scss', 'public/css')
   // .version()
  
