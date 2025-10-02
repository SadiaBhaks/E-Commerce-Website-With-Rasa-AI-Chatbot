import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Graceful shutdown handler
const shutdown = async () => {
  try {
    console.log('Closing database pool...');
    await pool.end(); 
    console.log('Database pool closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing database pool:', err);
    process.exit(1);
  }
};

// Listen for termination signals
process.on('SIGINT', shutdown);   
process.on('SIGTERM', shutdown);  

export default pool;

