const gulp = require('gulp');  
const nodemon = require('gulp-nodemon');  
const sass = require('gulp-sass');   
const livereload = require('gulp-livereload');  
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');


gulp.task('sass', ()=>{
    return gulp.src('public/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload())
});


gulp.task('scripts', ()=> {  
    return gulp.src('public/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(livereload());
});

gulp.task('ejs',()=>{  
    return gulp.src('views/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('public/scss/*.scss', ['sass']);
    gulp.watch('public/js/*.js', ['scripts']);
    gulp.watch('views/*.ejs', ['ejs']);
    
});


gulp.task('server',function(){  
    nodemon({
        script: 'index.js',
        ext: 'ejs js scss', // extensions to watch
        watch: 'lib' 
    })
    .on('restart', function () {
        setTimeout(function(){
          livereload.changed('index.js');
          gulp.src('index.js').pipe(notify('Reloading page, please wait...'));
        }, 1000); // 1 second pause
    });
});

gulp.task('serve', ['server','watch']);  