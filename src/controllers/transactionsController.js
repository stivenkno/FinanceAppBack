import pool from "../config/config.js";

const getTransactions = async (req, res) => {
  try {
    const query = `
                SELECT * FROM transactions
                WHERE user_id = $1
            `;
    const result = await pool.query(query, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};

const createTransaction = async (req, res) => {
  const { fecha, category, description, amount, type } = req.body;

  try {
    const query = `
        INSERT INTO transactions (user_id, fecha, category, description, amount, type)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
    const result = await pool.query(query, [
      req.user.id,
      fecha,
      category,
      description,
      amount,
      type,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear la transacción:", error);
    res.status(500).json({ error: "Error al crear la transacción" });
  }
};

const updateTransaction = async (req, res) => {
  const { id, fecha, category, description, amount, type } = req.body;

  try {
    const query = `
        UPDATE transactions
        SET fecha = $2, category = $3, description = $4, amount = $5, type = $6
        WHERE id = $1
        RETURNING *
      `;
    const result = await pool.query(query, [
      id,
      fecha,
      category,
      description,
      amount,
      type,
    ]);
    res.json("Transacción actualizada exitosamente:", result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar la transacción:", error);
    res.status(500).json({ error: "Error al actualizar la transacción" });
  }
};

export { createTransaction, getTransactions, updateTransaction };
