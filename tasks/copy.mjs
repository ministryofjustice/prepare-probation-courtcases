import changed from 'gulp-changed';
import preservetime from 'gulp-preservetime';

export default (config, gulp) => () => gulp.src(config.src)
  .pipe(changed(config.dest, { hasChanged: changed.compareContents }))
  .pipe(gulp.dest(config.dest))
  .pipe(preservetime());
