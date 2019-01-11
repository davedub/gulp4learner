
## Overview

I recently forked a [boilerplate web app project](https://github.com/jh3y/gulp-boilerplate) that uses Gulp 4 and quickly noticed that Gulp 4 looks a lot different than the prior version. Gulp 4 is now [the default version of Gulp](https://medium.com/gulpjs/version-4-now-default-92c6cd4beb45) and there is of course [API documentation](https://gulpjs.com/docs/en/api/concepts) and a ["quick start" tutorial](https://gulpjs.com/docs/en/getting-started/quick-start) but if you are used to Gulp 3, neither of these resources will give you a hands-on approach to reconfiguring your own understanding of this streaming build system for NodeJS projects.  There is also a [recent blog post](https://www.webstoemp.com/blog/switching-to-gulp4/) and [one from 2016]((https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/)) about Gulp 4 but they don't seem structured in a way that reflects the questions you may have trying to parse the difference. So this project seeks to come up with something that does, through a series of branches.

## Project branches

This project is designed to walk through a Gulp 4-VueJS-Sass project through a series of branches.

> **master** - merge all branches  
> **babel** - add ES6+ support  
> **styles** - add [Sass](https://sass-lang.com/) (CSS preprocessor) and [Bootstrap 4 CSS](https://getbootstrap.com/docs/4.0/getting-started/theming/#importing) using built-in Sass variable 
> **scripts** - add: [VueJS](https://vuejs.org/) ("The Progressive JavaScript Framework") and [Bootstrap 4 Javascript](https://getbootstrap.com/docs/4.2/getting-started/javascript/) 
> **upandrunning** - add: Live reload, etc. (future)  
### This branch: babel

To write the gulpfile in es6, and thus use the import command rather than require(), let's add [Babel](https://babeljs.io) to the project. As noted in [its docs](https://babeljs.io/docs/en/), "Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments." 

`$ npm install babel-cli babel-core babel-preset-env`

See [this article](https://stackoverflow.com/questions/31444350/is-it-possible-write-a-gulpfile-in-es6) for more information. Note that this step requires changing the name of the gulpfile to gulpfile.babel.js and the creation of a .babelrc file.

Now that we have Babel set up, and to shorten up our gulpfile, let's move our gulp processes out of the gulpfile and use an import statement to add them back in. To do this, create a `build-tasks` folder at root and take the examples of the gulp functions that we created on project setup (sayhey and messages) and move them there. 

Now we can easily import them into gulpfile.babel.js.
