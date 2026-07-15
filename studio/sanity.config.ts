/**
 * Sanity Studio configuration (separate from Next.js app)
 * 
 * To run Studio locally:
 * 1. cd studio && npm install
 * 2. sanity init --reconfigure (to set up project ID)
 * 3. npm run dev
 * 
 * This file lives outside the Next.js app to avoid React 19
 * experimental hook conflicts that occur when embedding Studio
 * inside Next.js App Router.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '../src/sanity/schemas';

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  'replace-me';

export default defineConfig({
  name: 'alrawaabit-studio',
  title: 'AlRawaabit CMS',
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});