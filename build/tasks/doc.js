var gulp   = require('gulp');
var yuidoc = require('gulp-yuidoc');

var paths  = require('../paths');

gulp.task('doc-generate', function(){
  return gulp.src(paths.source).
	pipe(yuidoc.parser(null, 'api.json')).
	pipe(gulp.dest(paths.doc));
});

gulp.task('doc', ['doc-generate']);
