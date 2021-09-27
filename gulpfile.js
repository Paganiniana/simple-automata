const gulp  = require('gulp');
const concat = require( 'gulp-concat' );
const uglify = require( 'gulp-uglify' );
const config = require('./gulpconfig.json');
var browserSync = require( 'browser-sync' ).create();
const paths = config.paths;

// Run:
// gulp scripts.
// Uglifies and concat all JS files into one
gulp.task( 'scripts', function() {
	var scripts = [
		'./src/**/*.js',
	];
	gulp
		.src( scripts, { allowEmpty: true } )
		.pipe( concat( 'index.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( paths.dist ) );

	return gulp
		.src( scripts, { allowEmpty: true } )
		.pipe( concat( 'index.js' ) )
		.pipe( gulp.dest( paths.dist ) );
} );

/**
 * Watches .scss, .js and image files for changes.
 * On change re-runs corresponding build task.
 * 
 * Run: gulp watch
 */
 gulp.task( 'watch', function() {
	gulp.watch(
		[
			'./src/**/*.js',
			// '!js/theme.js',
			// '!js/theme.min.js',
		],
		gulp.series( 'scripts' )
	);
} );

/**
 * Starts browser-sync task for starting the server.
 *
 * Run: gulp browser-sync
 */
 gulp.task( 'browser-sync', function() {
	browserSync.init( config.browserSyncOptions );
} );


/**
 * Starts watcher with browser-sync.
 * Browser-sync reloads page automatically on your browser.
 * 
 * Run: gulp serve
 */
 gulp.task( 'serve', gulp.parallel( 'browser-sync', 'watch' ) );


 // Start browser sync and reload when dist directory chagnes
 gulp.task('default', gulp.series( 'serve' ))