import gulp from 'gulp'

// multi-step tasks require gulp.series or gulp.parallel
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
    "messages",
    gulp.series(
        message1,
        message2
    )
); 

// single step task does not require series or parallel 
// so you can use the same syntax as Gulp v3 
const sayhey = gulp.task("sayhey", function(done){
    return console.log("say hey"),
    done()
})

// note that use of done() is necessary is signal async completion 
// see: https://www.webstoemp.com/blog/switching-to-gulp4/

export { 
    sayhey, 
    messages
}