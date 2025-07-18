import { Router } from "express";
import pool from "../config/config";

const getGoals = (req, res) => {
  const query = `
    SELECT * FROM goals
    WHERE user_id = $1
  `;

  const result = pool.query(query, [req.user.id]);
  res.json(result.rows);
};

const createGoal = (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  const newGoal = {
    user_id: req.user.id,
    name,
    targetAmount: Number(targetAmount),
    currentAmount: 0,
    deadline,
    progress: 0,
  };

  const query = `
    INSERT INTO goals (user_id, name, target_amount, current_amount, deadline, progress)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const result = pool.query(query, [
    newGoal.user_id,
    newGoal.name,
    newGoal.targetAmount,
    newGoal.currentAmount,
    newGoal.deadline,
    newGoal.progress,
  ]);

  res.status(201).json(newGoal);
};

// Aportar a una meta
const contributeToGoal = (req, res) => {
  const { id, amount } = req.body;

  const query = `
    UPDATE goals
    SET current_amount = current_amount + $1
    WHERE id = $2
    RETURNING *
  `;

  const result = pool.query(query, [amount, id]);

  res.json(result.rows[0]);
};

// Eliminar una meta
const deleteGoal = (req, res) => {
  const { id } = req.body;

  const query = `
    DELETE FROM goals
    WHERE id = $1
    RETURNING *
  `;

  const result = pool.query(query, [id]);

  res.json(result.rows[0]);
};

export { getGoals, createGoal, contributeToGoal, deleteGoal };
