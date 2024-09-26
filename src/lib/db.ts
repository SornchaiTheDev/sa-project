import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('Connected to Vercel PostgreSQL');
  } catch (err) {
    const error = err as Error;
    console.error('Connection error', error.stack);
  }
};

export const queryDB = async (query: string, params?: any[]): Promise<any[]> => {
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const disconnectDB = async (): Promise<void> => {
  await client.end();
  console.log('Disconnected from PostgreSQL');
};
