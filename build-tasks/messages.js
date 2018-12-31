import gulp from 'gulp'

// tasks that use multiple functions require gulp.series or gulp.parallel
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

gulp.task("sayhey", function(done){
    return console.log("say hey"),
    done()
})

gulp.task("messages", gulp.series(
    message1,
    message2
));