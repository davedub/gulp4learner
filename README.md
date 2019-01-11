
## Overview

I recently forked a [boilerplate web app](https://github.com/jh3y/gulp-boilerplate) that uses Gulp 4 which I wanted to adapt to a Vue project, but quickly noticed it looks a fair bit  different than a Gulp 3 project! Although [Webpack]() is now bundled into [Vue CLI 3](https://cli.vuejs.org/), as a task runner, Gulp is [still useful](https://vuejsfeed.com/blog/webpack-vs-gulp-a-comparison) as a "toolkit for automating painful or time-consuming tasks in your development workflow." So let's take a  look at setting up a Vue project with Gulp 4, which is now [the default version](https://medium.com/gulpjs/version-4-now-default-92c6cd4beb45).

## Project branches

This project is designed to walk through a Gulp 4-VueJS-Sass project through a series of branches.

> **master** - merge all branches  
> **babel** - add ES6+ support  
> **styles** - add [Sass](https://sass-lang.com/) (CSS preprocessor) and [Bootstrap 4 CSS](https://getbootstrap.com/docs/4.0/getting-started/theming/#importing) using built-in Sass variable 
> **scripts** - add: [VueJS](https://vuejs.org/) ("The Progressive JavaScript Framework") and [Bootstrap 4 Javascript](https://getbootstrap.com/docs/4.2/getting-started/javascript/) 
> **upandrunning** - add: Live reload, etc. (future)  

### This branch: styles

Add a [Sass module for a Gulp project](https://www.npmjs.com/package/gulp-sass) so that a Gulp task can ingest a .scss source file and emit from it the contents of a .css distribution file. 

```
$ npm install node-sass gulp-sass --save-dev
```

Then, do the following:

1. add root-level folders for source - `(./src)` - and build/output - `(./dist)` - files. 
2. Create a simple default.scss file in the source folder, in the `/components/styles` subfolder and add a few variable-driven styles. 
3. Create an `/assets/stylesheets` subfolder in the source folder; this will be the destination of the task that generates a css file from the Sass file. 
4. Create a new file - `styles.js` - in the build-tasks folder where you write a new Gulp task called `css.` Don't forget to import this new task into `gulpfile.babel.js.` 

To make sure it creates a css file in `dist/assets/stylesheets` subfolder from the sourced Sass file in the `src/assets/components/styles` subfolder, run `$ gulp css` from a CLI. 

At this point, the Gulp function simply ingests and outputs --

```
    return gulp
        .src(sourceDir + "/assets/components/styles/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(buildCSS))
    return done()
```

-- but let's add an [autprefixer](https://zellwk.com/blog/compass-vs-autoprefixer/) to "[comb] through compiled CSS files to add or remove vendor prefixes like `-webkit` and `-moz` after checking the code against [caniuse.com](https://caniuse.com)." Start by installing the module (`npm install --save-dev gulp-autoprefixer`), then add a pipe function to the task:

```
       .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
```

Now we can add Bootstrap 4. We do this via Gulp rather than by linking to ["straight up CSS"](https://coursetro.com/posts/design/72/Installing-Bootstrap-4-Tutorial) - which is what you would get by using a CDN - so that we can easily customize. Rather than customize with Sass files, however, we will use [Stylus](http://stylus-lang.com/) because there is a recent (as of December 2018) [node module port for Bootstrap 4](https://www.npmjs.com/package/bootstrap-4-stylus) that dispenses with the need to add other packages (JQuery, Popper, Tether) separately.

1. import the module to `/build-tasks/styles.js`: 

	import b4s from 'bootstrap-4-stylus';

2. add a new function to styles.js:

```
function bootstrap(done) {
    return (
        b4s.compress(buildCSS),
        done()
    )
}
```

3. make it a gulp task: `gulp.task('bootstrap', bootstrap);`

4. make both the existing task ('css') and this new gulp task into a serialized gulp task:

```
gulp.task("compilecss", gulp.series(
    css,
    bootstrap
));
```
Run the task `gulp compilecss` and it completes both tasks in a series.

```
$ gulp compilecss  
[20:51:49] Failed to load external module   @babel/register  
[20:51:49] Requiring external module babel-register  
[20:51:50] Using gulpfile   ~/Projects/stuff_gulp/gulp4learner/gulpfile.babel.js
[20:51:50] Starting 'compilecss'...
[20:51:50] Starting 'css'...  
[20:51:50] Finished 'css' after 6.96 ms  
[20:51:50] Starting 'bootstrap'...  
./dist/assets//stylesheets/ exists.  
[20:51:50] Finished 'bootstrap' after 6.31 ms  
[20:51:50] Finished 'compilecss' after 16 ms  
[stylus:success]:  compiled   ./dist/assets//stylesheets//bootstrap.min.css
```

Lastly, in the `src/assets/components/styles` subfolder, create two separate Sass files - `global.scss` and `header.scss` - which are imported into `main.scss` at the `/components` level of the subfolder. 
Make the `css()` function in the `styles.js` file use this file as its source, so that it combines all imported files from `/components/styles` into the `dist/assets/stylesheets` subfolder.

There are now two stylesheets available for use in your site (once index.html is created): a minified version of Bootstrap 4 and a `main.css` file that encapsulates all site specific styles that extend or customize Bootstrap 4.