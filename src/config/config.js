import pkg from "pg";
const { Pool } = pkg;

import { query } from "../DB/db.js";
import "dotenv/config";

// 📦 Crea el pool con conexión segura para Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para Render.com (SSL sin CA pública)
  },
});

// 🧪 Verifica conexión con PostgreSQL
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión exitosa a PostgreSQL");

    const res = await client.query("SELECT NOW() AS current_time");
    console.log("🕒 Hora actual en la BD:", res.rows[0].current_time);

    client.release();
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  }
})();

// 🛠️ Crear tablas si no existen
const createTables = async () => {
  try {
    await pool.query(query);
    console.log("✅ Tablas creadas o ya existentes.");
  } catch (err) {
    console.error("❌ Error creando tablas:", err);
  }
};

createTables();

export default pool;
