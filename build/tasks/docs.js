var gulp          = require( 'gulp' ),
    documentation = require( 'gulp-documentation' );

var paths = require( '../paths' );


gulp.task( 'docs-md', function () {
	gulp.src( paths.source ).
		pipe( documentation({ format: 'md' }) ).
		pipe( gulp.dest(paths.docs) );
});

gulp.task( 'docs-html', function () {
	gulp.src( paths.source ).
		pipe( documentation({ format: 'html' }) ).
		pipe( gulp.dest(paths.docs) );
});

gulp.task( 'docs-json', function () {
	gulp.src( paths.source ).
		pipe( documentation({ format: 'json' }) ).
		pipe( gulp.dest(paths.docs) );
});

gulp.task( 'docs', ['docs-md', 'docs-html', 'docs-json'] );

