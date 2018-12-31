import gulp from 'gulp'

var buildTasks = "./build-buildTasks"

/* top level functions
    gulp.task = define tasks
    gulp.src = point to files to use
    gulp.dest = point to folder to output
    gulp.watch = watch files for changes
*/

import {
    sayhey,
    messages,
  } from './build-tasks/messages'

import { styles } from './build-tasks//styles'