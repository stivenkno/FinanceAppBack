import pool from "../config/config.js";

const actualBalance = async (req, res) => {
  const query = `SELECT
  SUM(CASE WHEN type = 'Ingreso' THEN amount ELSE -amount END) AS balance
FROM transactions
WHERE user_id = $1;`;

  const result = await pool.query(query, [req.user.id]);
  res.json(result.rows[0]);
};

const totalIngresos = async (req, res) => {
  const query = `SELECT
  SUM(CASE WHEN type = 'Ingreso' THEN amount ELSE 0 END) AS total_ingresos
FROM transactions
WHERE user_id = $1;`;

  const result = await pool.query(query, [req.user.id]);
  res.json(result.rows[0]);
};

const totalEgresos = async (req, res) => {
  const query = `SELECT
  SUM(CASE WHEN type = 'Gasto' THEN amount ELSE 0 END) AS total_egresos
FROM transactions
WHERE user_id = $1;`;

  const result = await pool.query(query, [req.user.id]);
  res.json(result.rows[0]);
};

export { actualBalance, totalIngresos, totalEgresos };
