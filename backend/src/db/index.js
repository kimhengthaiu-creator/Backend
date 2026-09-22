import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from '../config/index.js';
import * as schema from './schema.js';

let client = null;
let db = null;

const isConfigured =
  Boolean(config.databaseUrl) &&
  !config.databaseUrl.includes('[PASSWORD]') &&
  !config.databaseUrl.includes('placeholder');

if (isConfigured) {
  try {
    client = postgres(config.databaseUrl, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    db = drizzle(client, { schema });
  } catch (err) {
    console.error('Failed to initialize database connection:', err.message);
  }
} else {
  console.warn(
    'Warning: DATABASE_URL is not configured with valid credentials. Database operations will require a valid Supabase connection string.'
  );
}

export { db, client, schema, isConfigured };
