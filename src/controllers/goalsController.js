import { Router } from "express";
import pool from "../config/config.js";

const getGoals = async (req, res) => {
  const query = `
    SELECT * FROM goals
    WHERE user_id = $1
  `;

  const result = await pool.query(query, [req.user.id]);

  res.json(result.rows);
};

const createGoal = async (req, res) => {
  const { name, targetamount, deadline } = req.body;

  const newGoal = {
    user_id: req.user.id,
    name,
    targetamount: Number(targetamount),
    currentamount: 0,
    deadline,
    progress: 0,
  };

  const query = `
    INSERT INTO goals (user_id, name, targetamount, currentamount, deadline, progress)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const result = await pool.query(query, [
    newGoal.user_id,
    newGoal.name,
    newGoal.targetamount,
    newGoal.currentamount,
    newGoal.deadline,
    newGoal.progress,
  ]);

  res.status(201).json(newGoal);
};

// Aportar a una meta
const contributeToGoal = async (req, res) => {
  const { id, amount } = req.body;

  if (!id || amount == null || isNaN(amount)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  // 1. Obtener el goal actual para conocer currentamount y targetamount
  const currentGoal = await pool.query(
    `SELECT currentamount, targetamount FROM goals WHERE id = $1`,
    [id]
  );

  if (currentGoal.rows.length === 0) {
    return res.status(404).json({ error: "Meta no encontrada" });
  }

  const { currentamount, targetamount } = currentGoal.rows[0];

  const newAmount = parseInt(currentamount) + parseInt(amount);
  const progress = (newAmount / targetamount) * 100;

  // 2. Actualizar la meta
  const result = await pool.query(
    `
    UPDATE goals
    SET currentamount = $1, progress = $2
    WHERE id = $3
    RETURNING *
    `,
    [newAmount, progress, id]
  );

  res.json(result.rows[0]);
};

// Eliminar una meta
const deleteGoal = async (req, res) => {
  const { id } = req.body;

  const query = `
    DELETE FROM goals
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  res.json(result.rows[0]);
};

export { getGoals, createGoal, contributeToGoal, deleteGoal };
