import browserSync from 'browser-sync';
import nodemon from 'nodemon';
import module from '../package.json';

export default config => () => new Promise((resolve) => {
  const server = nodemon({
    exec: module.scripts.start,
    ext: config.ext,
    ignore: config.ignore,
    watch: config.watch,
    quiet: true,
  });

  // Browser proxy for development
  const proxy = browserSync(config.proxy);

  // Reload browser on server restart
  server.on('start', proxy.reload);

  // Exit on ctrl + c
  process.once('SIGINT', () => {
    server.once('exit', process.exit);
    resolve();
  });
});
