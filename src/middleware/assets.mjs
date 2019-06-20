import express from 'express';
import { cwd } from '../adapters/directory.mjs';

// Serve application assets and GOV.UK Frontend
export default [
  express.static(`${cwd}/public/assets`),
  express.static(`${cwd}/node_modules/govuk-frontend/assets`),
];
