import express from 'express';
import { cwd } from '../adapters/directory.mjs';

// Serve static assets
const middleware = express.static(`${cwd}/public`);

// Export as middleware
export default (req, res, next) => middleware(req, res, next);
