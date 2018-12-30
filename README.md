
## Overview

I recently forked a [boilerplate web app project](https://github.com/jh3y/gulp-boilerplate) that uses Gulp 4 and quickly noticed that Gulp 4 looks a lot different than the prior version. Gulp 4 is now [the default version of Gulp](https://medium.com/gulpjs/version-4-now-default-92c6cd4beb45) and there is of course [API documentation](https://gulpjs.com/docs/en/api/concepts) and a ["quick start" tutorial](https://gulpjs.com/docs/en/getting-started/quick-start) but if you are used to Gulp 3, neither of these resources will give you a hands-on approach to reconfiguring your own understanding of this streaming build system for NodeJS projects.  There is also a [recent blog post](https://www.webstoemp.com/blog/switching-to-gulp4/) and [one from 2016]((https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/)) about Gulp 4 but they don't seem structured in a way that reflects the questions you may have trying to parse the difference. So this project seeks to come up with something that does, through a series of branches.

## Project branches

master - roll up everything into this one  
babel - ES6+ support  
styles - CSS preprocessors (future)  
scripts - Javascript (future)  
upandrunning - Live reload, etc. (future) 

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

To be added next.

#### Sources

[The Complete-ish Guide to Upgrading to Gulp 4](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/)

[Switching to Gulp 4](https://www.webstoemp.com/blog/switching-to-gulp4/)

[Gulp 4.0 Upgrade Guide](https://zzz.buzz/2016/11/19/gulp-4-0-upgrade-guide/)