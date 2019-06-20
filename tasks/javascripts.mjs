import browserSync from 'browser-sync';
import named from 'vinyl-named';
import stream from 'webpack-stream';
import webpack from 'webpack';
import options from '../webpack.config.mjs';

export default (config, gulp) => () => gulp.src(config.src)
  .pipe(named())
  .pipe(stream(options, webpack))

  // Write to files
  .pipe(gulp.dest(config.dest))

  // Reload in browser
  .pipe(browserSync.stream({ match: '**/*.js' }));
