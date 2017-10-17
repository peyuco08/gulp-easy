// Definimos nuestras dependencias a utilizar
const gulp = require('gulp');
	  concat = require('gulp-concat');
	  sass = require('gulp-sass');
	  pug = require('gulp-pug');
	  jshint = require('gulp-jshint');
	  webserver = require('gulp-webserver');

// Levantamos servidor local
gulp.task('webserver', function() {
	gulp.src('build')
	.pipe(webserver({
		livereload: true,
		directoryListing: true,
		open: true
	}));
});

// Definimos nuestra tarea para concatenar y minificar nuestros javascript
gulp.task('minify', function() {
	console.log('Minificamos a JS ');
	return gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('build/js/'));
});

gulp.task('jshint', function() {
	return gulp.src('src/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

// Definimos nuestra tarea para pasar nuestros SCSS a CSS
gulp.task('sass', function() {
	console.log('compilando a CSS');
	return gulp.src('src/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('build/css/'));
});

// Esta tarea observa si existen cambios en nuestros JS
gulp.task('watch-js', function() {
	gulp.watch('src/js/*.js', ['minify'], function() {
		console.log('Observando los cambios en los JS');
	});
});

// Esta tarea observa si existen errores en nuestros JS
gulp.task('watch-jshint', function() {
	gulp.watch('src/js/*.js', ['jshint'], function() {
		console.log('Observando los errores en los JS');
	});
});

// Definimos nuestra tarea para transpilar de Pug a HTML
gulp.task('pug', () =>
	gulp.src('src/pug/*.pug')
	.pipe(pug({
		pretty: true
		}))
	.pipe(gulp.dest('build'))
);

// Esta tarea observa si existen cambios en nuestros Sass
gulp.task('watch-sass', function() {
	gulp.watch('src/sass/*.scss', ['sass'], function() {
		console.log('Observando los cambios en los Sass');
	});
});

// Nuestras tareas que se ejecutan por defecto
gulp.task('default', function() {
	console.log('Ejecutando Gulp...');
	gulp.start('webserver', 'watch-js', 'watch-sass', 'pug', 'minify', 'jshint', 'sass');
	gulp.watch('src/pug/**/*.pug', ['pug']);
});