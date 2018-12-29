const gulp = require('gulp');

/* top level functions
    gulp.task = define tasks
    gulp.src = point to files to use
    gulp.dest = point to folder to output
    gulp.watch = watch files for changes
*/

// Log message
function message1(done){
    return (
        gulp.task(
            console.log('Gulp is running'),
            done()
        )
    )
}

function message2(done){
    return (
        gulp.task(
            console.log('Go catch it'),
            done()
        )
    )
}

gulp.task(
    "message",
    gulp.series(
        message1,
        message2
    )
);

