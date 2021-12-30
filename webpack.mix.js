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

// Custom assets
mix.js('resources/js/web/web.js', 'public/js/custom/web')
    .js('resources/js/admin/admin.js', 'public/js/custom/admin')
    .babel([
        'resources/js/web/scripts/**/*.js'
    ], 'public/js/custom/web/scripts.js')
    .babel([
        'resources/js/admin/scripts/**/*.js'
    ], 'public/js/custom/admin/scripts.js')
    .sass('resources/sass/web/web.scss',
        'public/css/custom/web')
    .sass('resources/sass/web/web-dark.scss',
        'public/css/custom/web')        
    .sass('resources/sass/admin/admin.scss',
        'public/css/custom/admin')
    .sass('resources/sass/admin/admin-dark.scss',
        'public/css/custom/admin')
    // iCore assets
    .js('vendor/n1ebieski/icore/resources/js/vendor/vendor.js', 'js/vendor/icore/vendor')
    .js('vendor/n1ebieski/icore/resources/js/web/web.js', 'js/vendor/icore/web')
    .js('vendor/n1ebieski/icore/resources/js/admin/admin.js', 'js/vendor/icore/admin')
    .babel([
        'vendor/n1ebieski/icore/resources/js/web/scripts/**/*.js'
    ], 'public/js/vendor/icore/web/scripts.js')
    .babel([
        'vendor/n1ebieski/icore/resources/js/admin/scripts/**/*.js'
    ], 'public/js/vendor/icore/admin/scripts.js') 
    .sass('vendor/n1ebieski/icore/resources/sass/vendor/vendor.scss',
        'css/vendor/icore/vendor')
    .sass('vendor/n1ebieski/icore/resources/sass/web/web.scss',
        'css/vendor/icore/web')
    .sass('vendor/n1ebieski/icore/resources/sass/web/web-dark.scss',
        'css/vendor/icore/web')
    .sass('vendor/n1ebieski/icore/resources/sass/admin/admin.scss',
        'css/vendor/icore/admin')
    .sass('vendor/n1ebieski/icore/resources/sass/admin/admin-dark.scss',
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