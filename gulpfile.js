var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');

gulp.task('styles', function() {
	return gulp.src('src/styles/main.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(concat('main.min.css'))
		.pipe(autoprefixer({browsers: ['> 0%']}))
		.pipe(gulp.dest('css/'));
});


gulp.task('js', function(){ 
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/'));
});


gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./'));
});


gulp.task('js-vendors', function(){
	var vendors = [
		'bower_components/angular/angular.min.js',
		'bower_component/jquery/dist/jquery.min.js'
	];

	return gulp.src(vendors)
		.pipe(concat('vendors.min.js'))
		.pipe(gulp.dest('dist/js'));

});




gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.scss', [ 'styles' ]);
	gulp.watch('src/js/**/*.js', [ 'js' ]);
	gulp.watch('src/**/*.html', [ 'html' ]);
});

gulp.task('default', ['styles','js','html', 'watch']);