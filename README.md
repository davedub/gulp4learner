
## Overview

I recently forked a [boilerplate web app](https://github.com/jh3y/gulp-boilerplate) that uses Gulp 4 which I wanted to adapt to a Vue project, but quickly noticed it looks a fair bit  different than a Gulp 3 project! Although [Webpack]() is now bundled into [Vue CLI 3](https://cli.vuejs.org/), as a task runner, Gulp is [still useful](https://vuejsfeed.com/blog/webpack-vs-gulp-a-comparison) as a "toolkit for automating painful or time-consuming tasks in your development workflow." So let's take a  look at setting up a Vue project with Gulp 4, which is now [the default version](https://medium.com/gulpjs/version-4-now-default-92c6cd4beb45).

## Project branches

This project is designed to walk through a Gulp 4-VueJS-Sass project through a series of branches.

> **master** - merging latest version of all branches  
> **babel** - adding ES6+ support  
> **styles** - adding [Sass](https://sass-lang.com/) (CSS preprocessor) and [Bootstrap 4 CSS](https://getbootstrap.com/docs/4.0/getting-started/theming/#importing) using built-in Sass variable 
> **scripts** - adds: [VueJS](https://vuejs.org/) ("The Progressive JavaScript Framework") and [Bootstrap 4 Javascript](https://getbootstrap.com/docs/4.2/getting-started/javascript/)
> **upandrunning** - adds: Live reload, etc. (future) 

### Initial commit

Start by installing Gulp 4 globally

```
$ npm rm -g gulp
$ npm install -g gulp-cli
```

This will bring you to "CLI version" of 3.9.1 and a "Local Version" of 4.0.0.

Next, initialize a new git-enabled, node project (like this one):

`$ git init`
`$ npm init`

After completing the steps to create package.json following `npm init`, add gulp to the project as a development dependency:

`npm install gulp --save-dev`

(There are dozens of Node modules on nmpjs.org for Gulp but we will leave them all alone until as and when we need them.)

Next, because every Gulp projects uses a gulpfile that acts as a "[manifest to define our tasks](http://brandonclapp.com/what-is-gulp-js-and-why-use-it/)," we create a gulp file.

`$ touch gulpfile.js`

In a simple project, the various things Gulp can do -- gulp.task (define tasks), gulp.src (point to files to use), gulp.des (point to folder to output to) and gulp.watch (watch files for changes) - might all be contained in this one file. We will soon see how this is limiting and gets pretty messy. The better approach is for different gulp processes to be placed into separated javascript files that are stored elsewhere, then imported into the gulpfile. But let's start with this.

In our gulpfile.js, we will create two methods, one that should look familiar and one that shows something new. The familiar one is a task that simply writes a line to the console:

```
gulp.task('sayhey', function(done){
    return console.log("say hey"),
    done()
})
```

Our second task requires two tasks to be performed in a sequence - or a series - so after writing each task as a vanilla javascript function - `function message1()` and `function message2()` - we create a gulp task that calls the gulp.series method to indicate the order in which they are performed:

```
gulp.task(
    "message",
    gulp.series(
        message1,
        message2
    )
)
```

Now, if we run `gulp sayhey` and `gulp messages`, the tasks will run (that is, if we make sure to use the done() callback function in our Gulp functions, for the reasons described next.

#### Asynch completion

One error you may see early on after switching to Gulp 4 is forgetting to "signal async completion."

```
[12:16:41] Using gulpfile ~\Projects\myproject\gulpfile.js
[12:16:41] Starting 'message'...
HTTP Server Started
[12:16:41] The following tasks did not complete: message
[12:16:41] Did you forget to signal async completion?
```

Gulp uses [various ways to normalize the asynchonicity](https://gulpjs.com/docs/en/getting-started/async-completion) of Node libraries but if it cannot find one, it throws this error. For present purposes, and to keep things simple, use the not-so-arbitrarily named callback function named done() to [tell Gulp that the task is done](https://stackoverflow.com/questions/29694425/what-does-gulp-done-method-do):

> "Your task function can "accept a callback" function parameter (often this function parameter is named done). Executing that done function tells Gulp 'a hint to tell it when the task is done'."

### Branch: babel

To write the gulpfile in es6, and thus use the import command rather than require(), let's add [Babel](https://babeljs.io) to the project. As noted in [its docs](https://babeljs.io/docs/en/), "Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments." 

`$ npm install babel-cli babel-core babel-preset-env`

See [this article](https://stackoverflow.com/questions/31444350/is-it-possible-write-a-gulpfile-in-es6) for more information. Note that this step requires changing the name of the gulpfile to gulpfile.babel.js and the creation of a .babelrc file.

Now that we have Babel set up, and to shorten up our gulpfile, let's move our gulp processes out of the gulpfile and use an import statement to add them back in. To do this, create a `build-tasks` folder at root and take the examples of the gulp functions that we created on project setup (sayhey and messages) and move them there. Now we can easily import them into gulpfile.babel.js.

### Branch: styles

Add a [Sass module for a Gulp project](https://www.npmjs.com/package/gulp-sass) so that a Gulp task can ingest a .scss source file and emit from it the contents of a .css distribution file. 

```
$ npm install node-sass gulp-sass --save-dev
```

Then do the following:

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

Lastly, let's add Bootstrap 4. We will do this via Gulp so that we can use Bootstrap 4 Sass, as opposed to "straight up CSS" (which is what you would get using a CDN), to be able to add Sass customizations (see [this article](https://coursetro.com/posts/design/72/Installing-Bootstrap-4-Tutorial) on that difference).



At this point, the task is not set up to merge multiple source (.scss) files into a single output (.css) file but we could add this later.)

### Branch: scripts

Do this next. 

#### Sources

[Gulp 4 API documentation](https://gulpjs.org/API.html)

[Gulp 4 "quick start" tutorial](https://gulpjs.com/docs/en/getting-started/quick-start) 

[The Complete-ish Guide to Upgrading to Gulp 4](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/)

[Switching to Gulp 4](https://www.webstoemp.com/blog/switching-to-gulp4/)

[Gulp 4.0 Upgrade Guide](https://zzz.buzz/2016/11/19/gulp-4-0-upgrade-guide/)