const tsconfig = require('./tsconfig.json');

const gulp = require('gulp'),
      changed = require('gulp-changed'),
      concat = require('gulp-concat'),
      merge = require('merge-stream'),
      cleanCss = require('gulp-clean-css'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      through = require('through2'),
      uglify = require('gulp-uglify');

const browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      tsify = require('tsify'),
      stringify = require('stringify'),
      watchify = require('watchify');

const _ = require('lodash'),
      path = require('path'),
      del = require('del'),
      chalk = require('chalk'),
      beeper = require('beeper'),
      glob = require('glob'),
      notifier = require('node-notifier');

const BUILD_PATH = 'dist';
const NODE_MODULES_PATH = 'node_modules/';

const SOURCE_PATHS = {
    vendorStyles: [
        NODE_MODULES_PATH + 'bootstrap/dist/css/bootstrap.min.css',
        NODE_MODULES_PATH + 'bootstrap/dist/css/bootstrap-theme.css',
        NODE_MODULES_PATH + '@fortawesome/fontawesome-free/css/all.css',  
    ],

    fonts: [
        NODE_MODULES_PATH + '@fortawesome/fontawesome-free/webfonts/*.*'
    ]
};

let BUILD_RELEASE = false;

function nop() {
    return through.obj();
}


/////////////////////////////////////////////////////

function createBundler(config) {

    let bundler = browserify({
        entries: [config.entryFile],
        debug: !BUILD_RELEASE,
        // Those are needed for watchify
        cache: {},
        packageCache: {}
    });

    // Add TypeScript compilation with support for path aliases defined in tsconfig.
    bundler.plugin(tsify, tsconfig.compilerOptions);

    bundler.transform( stringify({
        extensions: ['.ng.html'],
        minify: true,
        minifyOptions: {
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            collapseWhitespace: true,
            conservativeCollapse: false,
            preserveLineBreaks: false,
            collapseBooleanAttributes: false,
            // Removing this might cause issues with some templates
            removeAttributeQuotes: false,
            removeRedundantAttributes: false,
            useShortDoctype: false,
            removeEmptyAttributes: false,
            removeScriptTypeAttributes: false,
            removeStyleLinkTypeAttributes: false,
            removeOptionalTags: false,
            removeIgnored: false,
            removeEmptyElements: false,
            lint: false,
            keepClosingSlash: true,
            // This is needed if we use frameworks that treat tags in a case-sensitive way (angular >=2)
            caseSensitive: true,
            minifyJS: false,
            minifyCSS: false,
            minifyURLs: false
        }
    }));

    return bundler;
}
    
function makeBundle(bundler) {
    const destFile = BUILD_PATH + '/js/app.min.js'
    const destFilePath = path.dirname(destFile),
        destFileName = path.basename(destFile);

    let startTime = new Date(),
        errorMessages = [];
    if (!BUILD_RELEASE) {
        notifier.notify({
            title: 'Start Bundling',
            message: `Starting to rebuild the ${destFileName} bundle`,
            sound: false,
            timeout: 2
        });
    }
    return bundler
        .bundle()
        .on('error', function (error) {
            beeper();
            console.log(chalk.red(`\nTask is aborting, scripts HAVE NOT been compiled:\n ${error}\n`));
            errorMessages.push(error);
            this.emit('end');
        })
        .pipe(source(destFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(BUILD_RELEASE ? uglify() : nop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destFilePath))
        .on('end', () => {
            let endTime = new Date();
            let delta = Math.round( (endTime - startTime) / 1000);

            console.log(chalk.green(`Bundle created in ${delta} seconds`));
            if (!BUILD_RELEASE) {
                if (errorMessages.length > 0) {
                    notifier.notify({
                        title: 'Errors have been found',
                        message: `Creation of ${destFileName} completed but there were errors. Please check the console.`,
                        timeout: 5
                    });
                } else {
                    notifier.notify({
                        title: 'Bundle creatied',
                        message: `${destFileName} created in ${delta} seconds.`,
                        sound: false,
                        timeout: 5
                    });
                }
            }
        })
        ;
}

function startWatchify(config) {
    let bundler = createBundler(config);
    let watcher = watchify(bundler);

    watcher.on('update', () => {

        console.log(
            chalk.yellow(`Changes detected. Recompile`));

        makeBundle(watcher, config);
    });

    watcher.on('log', console.log);

    return makeBundle(watcher, config);
}

gulp.task('copy-fonts', () => {
    let files = SOURCE_PATHS.fonts,
        destinationPath = BUILD_PATH + '/webfonts/',
        task = gulp
            .src(files)
            .pipe(changed(destinationPath))
            .pipe(gulp.dest(destinationPath));

    return task;
});

gulp.task('copy-html',  () => {
    let files = ['src/index.html'],
        task = gulp
        .src(files)
        .pipe(changed(BUILD_PATH))
        .pipe(gulp.dest(BUILD_PATH));

    return task;
});
    
gulp.task('compile-styles', function() {
    const destFilePath = BUILD_PATH + '/css/',
    destFileName = path.basename('styles.min.css');

    let styleFiles = glob.sync(
            'src/**/*.css'
        ),

        scssFiles = glob.sync(
            'src/**/*.scss'
        ),

        minifyOptions = {
            compatibility: '*',
            level: 1
        },

        sassStream = scssFiles ? gulp.src(scssFiles)
        .pipe(sass({
            errLogToConsole: true
        })) : null,

        cssStream = styleFiles ? gulp.src(styleFiles) : null,

        stylesStream;

    if (cssStream) {
        if (sassStream) {
            stylesStream = merge(cssStream, sassStream);
        } else {
            stylesStream = cssStream;
        }
    } else {
        if (sassStream) {
            stylesStream = sassStream;
        } else {
            throw 'No input streams for CSS/SASS styles';
        }
    }
    return stylesStream
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(concat(destFileName))
            .pipe(BUILD_RELEASE ? cleanCss(minifyOptions) : nop())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destFilePath));
});

gulp.task('compile-vendor-styles', () => {
    let concatOutputFileName = 'vendor.min.css',
        styleFiles = 
            _.flatten(SOURCE_PATHS.vendorStyles)
        ,
        minifyOptions = {
            compatibility: '*',
            level: 1
        },
        cssStream = gulp.src(styleFiles);

    return cssStream
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(concat(concatOutputFileName))
            .pipe(BUILD_RELEASE ? cleanCss(minifyOptions) : nop())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(BUILD_PATH + '/css/'));
});

gulp.task('watch', () => {
    let config = {
        entryFile: 'src/js/app.js'
    };
    return startWatchify(config);
});

gulp.task('build-scripts', () => {
    let config = {
        entryFile: 'src/js/app.js'
    };
    let bundler = createBundler(config);
    return makeBundle(bundler);
});

gulp.task('build', [
    'copy-html',
    'compile-vendor-styles',
    'compile-styles',
    'copy-fonts',
    'build-scripts'
]);