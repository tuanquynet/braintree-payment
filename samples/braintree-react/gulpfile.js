/**
 * FIXME: this gulpfile is not configured except icon-font
 * NEED REVISE
 */
/*eslint-env node*/
const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// this is my proposed way to group all gulp component into a namespace
const g = require('gulp-load-plugins')();

/**
 * Configs
 */
let mode = 'dev';
let paths = {
	src: 'src',
	dist: 'dist',
	assets: 'private',
	// subfolders:
	fonts: 'fonts',
	images: 'img',
	mock: 'mock',
	scripts: 'js',
	styles: 'css',
	// temporary
	tmp: '.tmp',
	// other computed paths
	get srcFonts() { return paths.src + '/' + paths.fonts; },
	get srcImages() { return paths.src + '/' + paths.images; },
	get srcScripts() { return paths.src + '/' + paths.scripts; },
	get srcStyles() { return paths.src + '/' + paths.styles; },
	get distFonts() { return paths.dist + '/' + paths.fonts; },
	get distImages() { return paths.dist + '/' + paths.images; },
	get distScripts() { return paths.dist + '/' + paths.scripts; },
	get distStyles() { return paths.dist + '/' + paths.styles; },
};

/**
 * Task: iconfont
 * Generate icon font from assets/icons SVG folder
 * NEED INSTALLING:
 * "gulp-consolidate": "^0.2.0",
 * "gulp-iconfont": "^8.0.1",
 */
gulp.task('iconfont', function() {
	var fontName = 'icons';

	gulp.src([path.join(paths.assets, '/icons/*.svg')])
		.pipe(g.iconfont({
			fontName: fontName,
			// autohint: true,
			formats: ['ttf', 'eot', 'woff2', 'woff']
		}))
		.on('glyphs', function(glyphs/*, options*/) {
			var opts = {
				glyphs: glyphs.map(function(glyph) {
					// this line is needed because gulp-iconfont has changed the api from 2.0
					return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) };
				}),
				className: 'icon',
				fontName: fontName,
				fontPath: '../fonts',
				fontPathDemo: '../src/fonts'
			};

			// generate _icons.scss
			gulp.src('private/iconfont-templates/_icons.scss')
				.pipe(g.consolidate('lodash', opts ))
				.pipe(gulp.dest('src/css')); // change icons.scss output folder here

			// // generate icons.html for previewing
			gulp.src('private/iconfont-templates/icons.html')
				.pipe(g.consolidate('lodash', opts))
				.pipe(gulp.dest('private')); // set path to export your sample HTML
		})
		.pipe(gulp.dest('src/fonts')); // set path to generate the font file to
});

// ----------------------------------------------------------------------------


/**
 * Task: styles
 * compile sass, add browser prefix
 */
gulp.task('styles', function() {
	return gulp.src(path.join(paths.srcStyles, '/*.scss'))
		.pipe(g.sourcemaps.init())
		.pipe(g.sass({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.'],
			onError: console.error.bind(console, 'Sass error:')
		}))
		.pipe(g.postcss([
			require('autoprefixer-core')({browsers: ['last 2 version', 'ie >= 9']})
		]))
		.pipe( g.if(mode === 'dev', g.sourcemaps.write()) )
		.pipe(gulp.dest(paths.srcStyles))
		.pipe( g.if(mode !== 'dev', gulp.dest(paths.distStyles)) )
		.pipe(browserSync.stream());
});

// ----------------------------------------------------------------------------

/**
 * Task: jshint
 * Lint javascript
 */
gulp.task('jshint', function() {
	return gulp.src([
		path.join(paths.srcScripts, '/**/*.js'),
		path.join('!' + paths.srcScripts, '/lib/*.js'),
		path.join('!' + paths.srcScripts, '/vendor/*.js')
	])
		.pipe(browserSync.stream({once: true}))
		.pipe(g.jshint())
		.pipe(g.jshint.reporter('jshint-stylish'))
		.pipe(g.if(!browserSync.active, g.jshint.reporter('fail')));
});

// ----------------------------------------------------------------------------

/**
 * Task: copy-images
 * Minify and copy UI images to dist
 */
gulp.task('copy-images', function() {
	return gulp.src(path.join(paths.srcImages, '**/*'))
		// .pipe(g.cache(g.imagemin({
		// 	progressive: true,
		// 	interlaced: true,
		// 	// don't remove IDs from SVGs, they are often used
		// 	// as hooks for embedding and styling
		// 	svgoPlugins: [{cleanupIDs: false}]
		// })))
		.pipe(gulp.dest(paths.distImages));
});

// ----------------------------------------------------------------------------

/**
 * Task: copy-fonts
 * Copy fonts
 */
gulp.task('copy-fonts', function() {
	return gulp.src(path.join(paths.srcFonts, '/**/*'))
		.pipe(gulp.dest(paths.distFonts));
});

// ----------------------------------------------------------------------------

/**
 * Task: copy-extras
 * copy extra files in root folder (.htaccess, robot.txt, favicon.ico...)
 */
gulp.task('copy-extras', function() {
	return gulp.src([
		path.join(paths.src, '/*.*'),
		path.join('!' + paths.src, '/*.html')
	], {
		dot: true,
		base: 'html'
	}).pipe(gulp.dest(paths.dist));
});

// ----------------------------------------------------------------------------

/**
 * Task: clean
 * Clean compiled folders
 */
gulp.task('clean', require('del').bind(null, [paths.dist, paths.tmp]));

// ----------------------------------------------------------------------------

/**
 * Task: watch
 * Watch for changes
 */
gulp.task('watch', ['styles'], function () {
	// watch for HTML / JS changes
	gulp.watch([
		path.join(paths.src, '/**/*.html'),
		path.join(paths.src, '/**/*.js'),
	], function(event) {
		browserSync.reload(event.path);
	});

	//watch for SCSS changes
	gulp.watch(path.join(paths.src, '/css/**/*.scss'), function(/*event*/) {
		gulp.start('styles');
	});
});

// ----------------------------------------------------------------------------

/**
 * Task: serve
 */
gulp.task('serve', ['watch'], function () {
	console.log('Please start app using `npm start` instead');
});

// ----------------------------------------------------------------------------

/**
 * Task: build
 * build to dist folder
 *
 * FIXME: NOT TEST
 */
gulp.task('build', ['clean', 'jshint'], function() {
	mode = 'dist';
	gulp.start(['styles', 'copy-images', 'copy-fonts', 'copy-extras']);
});

// FIXME: NOT tested
gulp.task('report', ['build'], function() {
	return gulp.src('dist/**/*').pipe(g.size({title: 'build', gzip: true}));
});


// ----------------------------------------------------------------------------
/**
 * Default task
 */
gulp.task('default', function() {
	gulp.start('serve');
});
