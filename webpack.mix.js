const mix = require('laravel-mix');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: [
                'fonts/**',
                'css/vendor/icore/**',
                'js/vendor/icore/**'
            ]
        })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'node_modules/')
        }
    }
});

mix.js('resources/js/vendor/icore/vendor/vendor.js', 'js/vendor/icore/vendor')
    .js('resources/js/vendor/icore/web/web.js', 'js/vendor/icore/web')
    .js('resources/js/vendor/icore/admin/admin.js', 'js/vendor/icore/admin')
    .scripts([
        'resources/js/vendor/icore/web/scripts/**/*.js'
    ], 'public/js/vendor/icore/web/scripts.js')
    .scripts([
        'resources/js/vendor/icore/admin/scripts/**/*.js'
    ], 'public/js/vendor/icore/admin/scripts.js')
    .sass('resources/sass/vendor/icore/vendor/vendor.scss',
        'css/vendor/icore/vendor')
    .sass('resources/sass/vendor/icore/web/web.scss',
        'css/vendor/icore/web')
    .sass('resources/sass/vendor/icore/web/web-dark.scss',
        'css/vendor/icore/web')
    .sass('resources/sass/vendor/icore/admin/admin.scss',
        'css/vendor/icore/admin')
    .sass('resources/sass/vendor/icore/admin/admin-dark.scss',
        'css/vendor/icore/admin')
    .browserSync({
        proxy: 'https://localhost',
        host: 'localhost',
        open: 'external',
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }        
    });

if (mix.inProduction()) {
    mix.version();
}