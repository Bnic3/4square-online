/**
 * Created by john.nana on 10/13/2016.
 */
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha= require('gulp-mocha'),
    env= require('gulp-env'),
    supertest= require('supertest');

gulp.task('default', ()=>{
    nodemon({
        script: './bin/www',
        ext:'js',
        env:{PORT:8000},
        ignore:['./node_modules/**']
    })
    .on('restart', ()=>{console.log('Restarting you application')})

});

gulp.task('test', ()=>{
    env({vars: {ENV:'Test'}});
    gulp.src('tests/*.js', {read:false})
    .pipe(gulpMocha({reporter:'nyan'}))
})
