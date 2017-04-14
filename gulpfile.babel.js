/**
 * Created by AterStrix on 16.03.2017.
 */
import gulp from 'gulp';
import sass from 'gulp-sass';
import util from 'gulp-util';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';

gulp.task("browserify", ()=> {
	return browserify({
		entries: 'src/bootstrap.ts',
		debug: true
	})
	.plugin(tsify, {
		target: 'es5',
		experimentalDecorators: true
	})
	.bundle()
	.on("error", function(err) {
		util.log(util.colors.red.bold(['browserify error']));
		util.log(err.message);
		this.emit('end');
	})
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./dist'))
});

gulp.task('sass', ()=> {
	return gulp.src('./src/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task("watch", ()=> {
	gulp.watch('src/**/*.ts', ['browserify']);
	gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('build', ['browserify', 'sass']);
gulp.task('default', ['build', 'watch']);
