import gulp from 'gulp'

// simple single step task does not require 
const sayhey = gulp.task("sayhey", function(done){
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
const messages = gulp.task(
    "message",
    gulp.series(
        message1,
        message2
    )
); 

gulp.task(
    "messages",
    gulp.series(
        message1,
        message2
    )
);

export { sayhey, messages }