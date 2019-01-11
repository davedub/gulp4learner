import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'

var 
  sourceDir = "./src",
  buildDir = "./dist",
  buildAssets  = buildDir + "/assets/",
  buildCSS = buildAssets + "/stylesheets/"

function css() {
    return gulp
        .src(sourceDir + "/assets/components/styles/*.scss")
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(buildCSS))
    return done()
}

gulp.task("css", css);