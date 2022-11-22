// // =================================================
// //
// // Gulpfile
// //
// // =================================================
// //
// //	Table of contents
// //
// //	- Gulp Configuration
// //	- HTML Task
// //	- Styles Sass
// //	- Browser Sync
// //	- Production: Minify CSS, JS and HTML

// // Development: Compiles but doesn't minify the files.
// // Production: Compiles and minifies the files


var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	minifyJS = require('gulp-uglify'),
	minifyCSS = require('gulp-clean-css'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	rename = require("gulp-rename");



var paths = {
  sass: {
    src: 'src/scss/**/*.scss',
    dest: 'src/css',
    opts: {

    }
  }
};




// =================================================
// Styles / Sass Tasks - Compile sass into CSS & auto-inject into browsers
// =================================================

gulp.task('sass', function () {
  return gulp.src(paths.sass.src)
  	.pipe(sourcemaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(concat(paths.sass.src))
	.pipe(rename('styles.css'))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sass.dest))
});



// =================================================
// Gulp Browser sync
// =================================================
gulp.task('browser-sync', function() {
    browserSync.init({
    	injectChanges: true,
        server: {
            baseDir: "./src/"
        }
    });
});



// =================================================
// Gulp Watch
// =================================================

gulp.task('watch:styles', function () {
  gulp.watch(paths.sass.src, gulp.series('sass'));
});

gulp.task('watch', gulp.series('sass',
  gulp.parallel('watch:styles')
));



// =================================================
// Gulp Default
// =================================================

gulp.task('default', gulp.series('browser-sync', 'sass', 'browser-sync',
  gulp.parallel('browser-sync', 'watch', )
));












// // =================================================
// // Gulp Configuration
// // =================================================

// var config = {
// 			src: 	[ 'src/' ],
// 			html: 	[ 'src/**/*.html' ],
// 			css: 	[ 'src/css'],
// 			scss: 	[ 'src/scss/**/*.scss' ],
// 			js: 	[ 'src/js/**/*.js' ],
// 			build: 	[ 'dist/' ]
// 			}



// // =================================================
// // Styles / Sass Tasks - Compile sass into CSS & auto-inject into browsers
// // =================================================

// gulp.task('sass', function() {

// 	return gulp.src(config.scss)
// 		.pipe(sourcemaps.init())
// 		.pipe(sass()
// 		.on('error', sass.logError))
// 		.pipe(sourcemaps.write())
// 		.pipe(rename('styles.css'))
// 	    .pipe(gulp.dest( 'src/css/' ))
// 	    .pipe(reload({stream:true}));
// 		// .pipe(sourcemaps.init())
// 		// .pipe(sass()
// 		// .on('error', sass.logError))
// 		// .pipe(autoprefixer('last 3 versions'))
// 		// .pipe()
// 		// .pipe(gulp.dest('dist/css/app.css'))
// 		// .pipe(browserSync.stream());
// 		// .pipe(reload({stream:true}));

// });




// // =================================================
// // Uglify Files
// // =================================================

// // gulp.min('min', function() {
// // 	config.js
// // 		.pipe(uglify())
// // 		.pipe(gulp.dest('dist/js/scripts.min.js'))
// // })



// // =================================================
// // Gulp Watch Files
// // =================================================

// gulp.task ('watch', function(){

//   gulp.watch(config.scss, ['scss']);

//   // gulp.watch(config.html, ['html']);


// });


// // // =================================================
// // // Browser Sync Task
// // // =================================================

// // gulp.task('browserSync', function() {

// // 	browserSync.init({
// // 		server: './'
// // 	});

// // 	gulp.watch("src/scss/**/*.scss", ['sass']);
// //     gulp.watch("src/*.html").on('change', browserSync.reload);

// // })

// gulp.task('browserSync', function() {
//     browserSync({
//         server: {
//             baseDir: config.src
//         }
//     });
// });



// =================================================
// Gulp Distribution/Production
// =================================================






// // =================================================
// // Gulp Default Tasks
// // =================================================

// // gulp.task('serve', ['sass']);
// gulp.task('default', ['sass']);



// ------------------------------------------------- configs


// ---------------------------------------------- Gulp Tasks
// gulp.task('sass', function () {
//   return gulp.src(paths.sass.src)
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest(paths.sass.dest))
// });



