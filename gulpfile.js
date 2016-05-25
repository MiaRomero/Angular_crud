const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cp = require('child_process');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
const protractor = require('gulp-protractor').protractor;
const KarmaServer = require('karma').Server;
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
// const minifyCss = require('gulp-minify-css');

const mongoose = require('mongoose');
var port = 3000;
const app = require(__dirname + '/server/_server');
var server;

var children = [];

var serverFiles = ['lib/**/*.js', 'test/**/*test.js', 'gulpfile.js',
                  'index.js', 'server/**/*.js'];
var clientFiles = ['app/**/*.js'];

var serverTestFiles = ['test/**/*test.js'];

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

// build dev tasks
gulp.task('webpack:dev', ['lint'], () => {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
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

gulp.task('sass:dev', () => {
  return gulp.src('app/css/**/*.scss')
  .pipe(maps.init())
  .pipe(sass())
  // .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./*.scss', ['sass:dev']);
});

gulp.task('build', ['webpack:dev', 'static:dev', 'sass:dev', 'css:dev']);

// build test task
gulp.task('webpack:test', ['lint'], () => {
  return gulp.src('test/unit/test_entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./test'));
});

// test tasks
gulp.task('mocha', () => {
  return gulp.src(serverTestFiles)
  .pipe(mocha());
});

gulp.task('startServersDB', ['build'], () => {
  server = app(port, process.env.MONGODB_URI || 'mongodb://localhost/ohMy_testDB', () => {
    console.log('server up on ' + port + ', mongo connected');
    children.push(cp.fork('server/static_server.js'));
  });
});

gulp.task('protractor', ['startServersDB'], () => {
  return gulp.src('test/integration/**/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/config.js'
  }))
  .on('end', () => {
    mongoose.connection.db.dropDatabase( () => {
      mongoose.disconnect( () => {
      server.close();
      });
    });
    children.forEach( (child) => {
      child.kill('SIGTERM');
    });
  })
  .on('error', () => {
    mongoose.connection.db.dropDatabase( () => {
      mongoose.disconnect( () => {
      server.close();
      });
    });
    children.forEach( (child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('karma', ['webpack:test'], (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.config.js'
  }, done).start();
});

gulp.task('test', ['protractor', 'karma']);
