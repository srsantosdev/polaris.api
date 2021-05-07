import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  host: process.env.PG_HOST ?? '0.0.0.0',
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) ?? 5432,
});

export class Connection {
  public static getPool(): Pool {
    return pool;
  }

  public static async query(
    query: string,
    params: string[],
  ): Promise<QueryResult<any>> {
    const queryResult = await pool.query(query, params);

    return queryResult;
  }
}
