const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const del = require("del");

const paths = {
  pug: ["./src/**/*.pug", "!./src/**/_*.pug"],
  sass: "./src/**/*.scss",
  js: "./src/**/*.js",
  img: "./src/img/**",
  output: "./bin",
  release: "./release",
};

const options = {
  pug: {
    basedir: "./src",
    pretty: true,
  },
  sass: {
    output: "expanded",
  },
};

const html = () => {
  return (
    gulp
      .src(paths.pug)
      .pipe(plumber())
      .pipe(pug(options.pug))
      .pipe(gulp.dest(paths.output))
  );
};
exports.html = html;

const css = () => {
  return (
    gulp
      .src(paths.sass, { since: gulp.lastRun(css) })
      .pipe(plumber())
      .pipe(sass(options.sass))
      .pipe(gulp.dest(paths.output))
  );
};
exports.css = css;

const js = () => {
  return (
    gulp
      .src(paths.js, { since: gulp.lastRun(js) })
      .pipe(plumber())
      .pipe(gulp.dest(paths.output))
  )
};
exports.js = js;

const img = () => {
  return (
    gulp
      .src(paths.img, { since: gulp.lastRun(img) })
      .pipe(plumber())
      .pipe(gulp.dest(`${paths.output}/img`))
  )
};
exports.img = img;

exports.default = gulp.parallel(html, css, js, img);

exports.watch = gulp.parallel( () => {
    browserSync({
      server: { baseDir: paths.output }
    });
    gulp.watch(`${paths.output}`, gulp.task(reload));
  }, () => {
    gulp.watch(paths.pug, gulp.task(html));
    gulp.watch(paths.sass, gulp.task(css));
    gulp.watch(paths.js, gulp.task(js));
    gulp.watch(paths.img, gulp.task(img));
  }
);

const reload = done => {
  browserSync.reload();
  done();
};

exports.clean = () => {
  return del([
    paths.output
  ]);
};
