
## Overview

I recently forked a [boilerplate web app](https://github.com/jh3y/gulp-boilerplate) that uses Gulp 4 which I wanted to adapt to a Vue project, but quickly noticed it looks a fair bit  different than a Gulp 3 project! Although [Webpack]() is now bundled into [Vue CLI 3](https://cli.vuejs.org/), as a task runner, Gulp is [still useful](https://vuejsfeed.com/blog/webpack-vs-gulp-a-comparison) as a "toolkit for automating painful or time-consuming tasks in your development workflow." So let's take a  look at setting up a Vue project with Gulp 4, which is now [the default version](https://medium.com/gulpjs/version-4-now-default-92c6cd4beb45).

## Project branches

This project is designed to walk through a Gulp 4-VueJS-Sass project through a series of branches.

> **master** - merges all branches  
> **babel** - adds ES6+ support  
> **styles** - adds [Sass](https://sass-lang.com/) (CSS preprocessor) and [Bootstrap 4 CSS](https://getbootstrap.com/docs/4.0/getting-started/theming/#importing) using built-in Sass variable 
> **scripts** - (TBD) adds: [VueJS](https://vuejs.org/) ("The Progressive JavaScript Framework") and [Bootstrap 4 Javascript](https://getbootstrap.com/docs/4.2/getting-started/javascript/)
> **upandrunning** - (TBD) adds: Live reload, etc. (future) 

### Initial commit

Install Gulp 4 globally

```
$ npm rm -g gulp
$ npm install -g gulp-cli
```

Next, initialize a new git-enabled, node project:

`$ git init`
`$ npm init`

After creating package.json, add gulp as a dev dependency:

`npm install gulp --save-dev`

Next, create the gulpfile that will act as a "[manifest to define our tasks](http://brandonclapp.com/what-is-gulp-js-and-why-use-it/)":

`$ touch gulpfile.js`

In a simple project, the various things Gulp can do -- gulp.task (define tasks), gulp.src (point to files to use), gulp.des (point to folder to output to) and gulp.watch (watch files for changes) - might all be contained in this one file. But this gets messy pretty quickly. The better approach is for different gulp functions to be separated and imported into the gulpfile.

For illustration purposes, create two methods, one that should look familiar and one that shows something new. The familiar one is a task that writes a line to the console:

```
gulp.task('sayhey', function(done){
    return console.log("say hey"),
    done()
})
```

The new one uses a series of Gulp functions so we create a gulp task that calls the gulp.series method to indicate the order in which they are performed:

```
gulp.task(
    "message",
    gulp.series(
        message1,
        message2
    )
)
```

If we run `gulp sayhey` and `gulp messages`, the tasks will run as expected - that is, if we make sure to use the done() callback function in our Gulp functions as long as we don't overlook Gulp 4's new requirement of signalling "async completion."

```
[12:16:41] Using gulpfile ~\Projects\myproject\gulpfile.js
[12:16:41] Starting 'message'...
HTTP Server Started
[12:16:41] The following tasks did not complete: message
[12:16:41] Did you forget to signal async completion?
```

Gulp uses [various ways to normalize the asynchonicity](https://gulpjs.com/docs/en/getting-started/async-completion) of Node libraries but if it cannot find one, it throws this error. For present purposes, and to keep things simple, use the not-so-arbitrarily named callback function named done() to [tell Gulp that the task is done](https://stackoverflow.com/questions/29694425/what-does-gulp-done-method-do):

> "Your task function can "accept a callback" function parameter (often this function parameter is named done). Executing that done function tells Gulp 'a hint to tell it when the task is done'."

#### Sources

[Gulp 4 API documentation](https://gulpjs.org/API.html)

[Gulp 4 "quick start" tutorial](https://gulpjs.com/docs/en/getting-started/quick-start) 

[The Complete-ish Guide to Upgrading to Gulp 4](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/)

[Switching to Gulp 4](https://www.webstoemp.com/blog/switching-to-gulp4/)

[Gulp 4.0 Upgrade Guide](https://zzz.buzz/2016/11/19/gulp-4-0-upgrade-guide/)