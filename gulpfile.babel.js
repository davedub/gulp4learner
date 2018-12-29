import gulp from 'gulp'

/* top level functions
    gulp.task = define tasks
    gulp.src = point to files to use
    gulp.dest = point to folder to output
    gulp.watch = watch files for changes
*/

// simple single step task does not require 
gulp.task('sayhey', function(done){
    return console.log("say hey"),
    done()
})

// multi-step tasks require gulp.series and gulp.parallel
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