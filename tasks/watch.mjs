export default (config, gulp) => () => Promise.all([
  // Watch for static asset changes
  gulp.watch(
    config.copy.src,
    gulp.series('copy'),
  ),

  // Watch for CSS changes
  gulp.watch(
    config.stylesheets.src,
    gulp.series('stylesheets'),
  ),

  // Watch for JavaScript changes
  gulp.watch(
    config.javascripts.src,
    gulp.series('javascripts'),
  ),
]);
