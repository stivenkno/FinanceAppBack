const createGoal = async (req, res) => {
  const { name, amount, fecha_limite } = req.body;

  try {
    const query = `
            INSERT INTO Goals (user_id, goal_name, goal_amount, goal_aporte, fecha_limite)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
    const result = await pool.query(query, [
      req.user.id,
      name,
      amount,
      0,
      fecha_limite,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear el objetivo:", error);
    res.status(500).json({ error: "Error al crear el objetivo" });
  }
};

const goal_aporte = async (req, res) => {
  const { id, aporte } = req.body;

  try {
    const query = `
      UPDATE Goals
      SET goal_aporte = COALESCE(goal_aporte, 0) + $2
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, aporte]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar el objetivo:", error);
    res.status(500).json({ error: "Error al actualizar el objetivo" });
  }
};
