import * as mysql from 'mysql2'

import { config } from 'dotenv'

config()

export const db = mysql.createConnection({
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string
})
