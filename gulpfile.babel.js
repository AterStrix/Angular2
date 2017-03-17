/**
 * Created by AterStrix on 16.03.2017.
 */
import gulp from 'gulp';
import sass from 'node-sass';
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
		experimantaDecorators: true
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

gulp.task("watch", ()=> {
	gulp.watch('src/**/*.ts', ['browserify']);
	gulp.watch('src/sass/*.scss', ['node-sass']);
});
