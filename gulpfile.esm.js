import gulp from 'gulp';
import * as task from './tasks/index.mjs';
import config from './tasks/config.json';

// Single tasks
gulp.task('clean', task.clean(config.clean, gulp));
gulp.task('copy', task.copy(config.copy, gulp));
gulp.task('javascripts', task.javascripts(config.javascripts, gulp));
gulp.task('serve', task.serve(config.serve, gulp));
gulp.task('stylesheets', task.stylesheets(config.stylesheets, gulp));
gulp.task('watch', task.watch(config, gulp));

// Build project
gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel(
      'copy',
      'javascripts',
      'stylesheets',
    ),
  ),
);

// Build project, start development
gulp.task(
  'dev',
  gulp.series(
    'default',
    gulp.parallel(
      'serve',
      'watch',
    ),
  ),
);
