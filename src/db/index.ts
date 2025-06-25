import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { upstashCache } from 'drizzle-orm/cache/upstash';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  cache: upstashCache({
    url: process.env.KV_REST_API_URL || '',
    token: process.env.KV_REST_API_TOKEN || '',
    global: false,
    config: { ex: 3600 },
  }),
  schema,
});
