var gulp = require("gulp"),

	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concatCss = require('gulp-concat-css');
//Сервер
gulp.task('server',function(){
		browserSync({
			port:9000,
			server: {
				baseDir: 'app'
			}
			});
		});
//Слежка
gulp.task ('watch',function(){
		gulp.watch([
			'app/*.html',
			'app/js/**/*.js',
			'app/css/**/*.css'
			]).on('change',browserSync.reload);
		});
//Задача по умолчанию
gulp.task('default',['server','watch']);

gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/i-*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('app/sprites/'));
});

 gulp.task('autoprefixer', function(){
    gulp.src('css/style.css')
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions','ie 8']
    }))
    .pipe(gulp.dest('app/css/*.css'));
  });