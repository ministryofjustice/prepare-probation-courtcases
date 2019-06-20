import { dirname, resolve } from 'path';

// Application path info
export const { pathname } = new URL(import.meta.url);
export const cwd = resolve(dirname(pathname), '../');

// Change working directory
const adapter = () => {
  process.chdir(cwd);
};

// Export as adapter
export default adapter;
