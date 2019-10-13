const mix = require("laravel-mix");
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
            Components: path.resolve(__dirname, "resources/js/components/"),
            Reducers: path.resolve(__dirname, "resources/js/reducers/"),
            Context: path.resolve(__dirname, "resources/js/contexts/"),
            Utils: path.resolve(__dirname, "resources/js/utils"),
            Sass: path.resolve(__dirname, "resources/sass"),
            SiteComponents: path.resolve(
                __dirname,
                "resources/js/site-components/"
            ),
            SiteRoutes: path.resolve(__dirname, "resources/js/site-routes/"),
            PortalComponents: path.resolve(
                __dirname,
                "resources/js/portal-components/"
            ),
            PortalRoutes: path.resolve(
                __dirname,
                "resources/js/portal-routes/"
            ),
            LoginComponents: path.resolve(
                __dirname,
                "resources/js/login-components/"
            ),
            StudentRoutes: path.resolve(
                __dirname,
                "resources/js/student-routes/"
            ),
            Hooks: path.resolve(__dirname, "resources/js/hooks/")
        }
    }
});

mix.react("resources/js/site.js", "public/js")
    .react("resources/js/login.js", "public/js")
    .react("resources/js/portal.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .sass("resources/sass/site.scss", "public/css")
    .sass("resources/sass/login.scss", "public/css")
    .sass("resources/sass/portal.scss", "public/css")
    .version();
