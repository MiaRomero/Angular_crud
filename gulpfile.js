const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cp = require('child_process');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
const protractor = require('gulp-protractor').protractor;
var children = [];

var serverFiles = ['lib/**/*.js', 'test/**/*test.js', 'gulpfile.js',
                  'index.js', 'server/**/*.js'];
var clientFiles = ['app/**/*.js'];

// lint tasks
gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint:client', () => {
  return gulp.src(clientFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint', ['lint:server', 'lint:client']);

// build tasks
gulp.task('webpack:dev', ['lint'], () => {
  return gulp.src('app/js/entry.js')
  .pipe(webpack( {
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('build', ['webpack:dev', 'static:dev', 'css:dev']);
