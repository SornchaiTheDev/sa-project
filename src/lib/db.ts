import { Pool } from "pg";
import { env } from "~/configs/env";

const pool = new Pool({
  user: env.POSTGRES_USER,
  host: env.POSTGRES_HOST,
  database: env.POSTGRES_DB,
  password: env.POSTGRES_PASSWORD,
  port: parseInt(env.POSTGRES_PORT || "5432", 10),
  ssl: false,
});

export const query = async (text: string, params?: unknown[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

export default pool;
