const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");

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
  },
  sass: {
    output: "expanded",
  },
};

gulp.task("html", () => {
  return (
    gulp
      .src(paths.pug)
      .pipe(plumber())
      .pipe(pug(options.pug))
      .pipe(gulp.dest(paths.output))
  );
});

gulp.task("css", () => {
  return (
    gulp
      .src(paths.sass)
      .pipe(plumber())
      .pipe(sass(options.sass))
      .pipe(gulp.dest(paths.output))
  );
});

gulp.task("js", () => {
  return (
    gulp
      .src(paths.js)
      .pipe(plumber())
      .pipe(gulp.dest(paths.output))
  )
});

gulp.task("img", () => {
  return (
    gulp
      .src(paths.img)
      .pipe(plumber())
      .pipe(gulp.dest(`${paths.output}/img`))
  )
});

gulp.task("default", gulp.parallel("html", "css", "js", "img"));

gulp.task("watch", gulp.parallel( () => {
    browserSync({
      server: { baseDir: paths.output }
    });
    gulp.watch(`${paths.output}`, gulp.task("reload"));
  }, () => {
    gulp.watch(paths.pug, gulp.task("html"));
    gulp.watch(paths.sass, gulp.task("css"));
    gulp.watch(paths.js, gulp.task("js"));
    gulp.watch(paths.img, gulp.task("img"));
  }
));

gulp.task("reload", (done) => {
  browserSync.reload();
  done();
});
